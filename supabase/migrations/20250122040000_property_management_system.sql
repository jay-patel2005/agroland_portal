-- Location: supabase/migrations/20250122040000_property_management_system.sql

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE public.property_type AS ENUM ('agricultural', 'residential', 'commercial', 'industrial');
CREATE TYPE public.property_status AS ENUM ('active', 'sold', 'pending', 'expired');
CREATE TYPE public.inquiry_status AS ENUM ('open', 'responded', 'closed');

-- Critical intermediary table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'buyer'::public.user_role,
    phone TEXT,
    location TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    property_type public.property_type NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    area DECIMAL(10,2) NOT NULL, -- in square feet
    location_village TEXT,
    location_taluka TEXT,
    location_district TEXT,
    location_state TEXT DEFAULT 'Gujarat',
    amenities TEXT[],
    images TEXT[],
    status public.property_status DEFAULT 'active'::public.property_status,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status public.inquiry_status DEFAULT 'open'::public.inquiry_status,
    response TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Saved properties (wishlist)
CREATE TABLE public.saved_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_properties_seller_id ON public.properties(seller_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_inquiries_property_id ON public.inquiries(property_id);
CREATE INDEX idx_inquiries_buyer_id ON public.inquiries(buyer_id);
CREATE INDEX idx_saved_properties_user_id ON public.saved_properties(user_id);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;

-- 4. Safe Helper Functions
CREATE OR REPLACE FUNCTION public.is_property_owner(property_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = property_uuid AND p.seller_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_inquiry(inquiry_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.inquiries i
    LEFT JOIN public.properties p ON i.property_id = p.id
    WHERE i.id = inquiry_uuid AND (
        i.buyer_id = auth.uid() OR 
        p.seller_id = auth.uid()
    )
)
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role::TEXT = required_role
)
$$;

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "properties_public_read" ON public.properties FOR SELECT
TO public USING (status = 'active'::public.property_status);

CREATE POLICY "sellers_manage_properties" ON public.properties FOR ALL
TO authenticated
USING (public.is_property_owner(id)) 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "inquiries_access_control" ON public.inquiries FOR ALL
TO authenticated
USING (public.can_view_inquiry(id))
WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "users_manage_saved_properties" ON public.saved_properties FOR ALL
TO authenticated
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 6. Complete Mock Data
DO $$
DECLARE
    seller_uuid UUID := gen_random_uuid();
    buyer_uuid UUID := gen_random_uuid();
    property1_uuid UUID := gen_random_uuid();
    property2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (seller_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'seller@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Rajesh Patel", "role": "seller"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (buyer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'buyer@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Priya Shah", "role": "buyer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create business data
    INSERT INTO public.properties (id, seller_id, title, description, property_type, price, area, location_village, location_taluka, location_district, amenities, images) VALUES
        (property1_uuid, seller_uuid, 'Premium Agricultural Land in Mehsana', 'Fertile agricultural land with water connection and road access. Perfect for farming and agricultural activities.', 'agricultural'::public.property_type, 2500000, 43560, 'Kadi', 'Kadi', 'Mehsana', ARRAY['Water Connection', 'Road Access', 'Electricity'], ARRAY['https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg']),
        (property2_uuid, seller_uuid, 'Residential Plot in Ahmedabad', 'Well-located residential plot in developing area with all modern amenities nearby.', 'residential'::public.property_type, 1800000, 2400, 'Bopal', 'Ahmedabad City', 'Ahmedabad', ARRAY['Water Supply', 'Electricity', 'Sewage'], ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg']);

    INSERT INTO public.inquiries (property_id, buyer_id, message) VALUES
        (property1_uuid, buyer_uuid, 'I am interested in this agricultural land. Can we discuss the price and visit the property?'),
        (property2_uuid, buyer_uuid, 'What are the nearby amenities? Is bank loan available for this property?');

    INSERT INTO public.saved_properties (user_id, property_id) VALUES
        (buyer_uuid, property1_uuid),
        (buyer_uuid, property2_uuid);
END $$;