import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyInfo from './components/PropertyInfo';
import PropertyMap from './components/PropertyMap';
import SellerContact from './components/SellerContact';
import RelatedProperties from './components/RelatedProperties';
import PropertyActions from './components/PropertyActions';

const PropertyDetailView = () => {
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState('en');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const propertyId = searchParams.get('id') || 'prop-001';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Mock property data
    const mockProperty = {
      id: propertyId,
      title: 'Premium Agricultural Land with Water Access',
      titleGu: 'પાણીની સુવિધા સાથે પ્રીમિયમ કૃષિ જમીન',
      price: 1500000,
      area: 5.2,
      district: 'Anand',
      taluka: 'Anand',
      village: 'Mogri',
      status: 'available',
      description: `This premium agricultural land offers excellent farming opportunities with reliable water access and fertile soil. The property is strategically located with good road connectivity and is suitable for various crops including cotton, wheat, and vegetables. The land has been well-maintained and comes with all necessary documentation.

The property features modern irrigation facilities and is located in a developing agricultural zone with good market access. Perfect for serious farmers or agricultural investors looking for quality land with growth potential.`,
      descriptionGu: `આ પ્રીમિયમ કૃષિ જમીન વિશ્વસનીય પાણીની સુવિધા અને ફળદ્રુપ માટી સાથે ઉત્તમ ખેતીની તકો પ્રદાન કરે છે. આ પ્રોપર્ટી સારી રોડ કનેક્ટિવિટી સાથે વ્યૂહાત્મક રીતે સ્થિત છે અને કપાસ, ઘઉં અને શાકભાજી સહિત વિવિધ પાકો માટે યોગ્ય છે.

આ પ્રોપર્ટીમાં આધુનિક સિંચાઈ સુવિધાઓ છે અને સારી બજાર પહોંચ સાથે વિકસતા કૃષિ ક્ષેત્રમાં સ્થિત છે. ગુણવત્તાયુક્ત જમીન શોધતા ગંભીર ખેડૂતો અથવા કૃષિ રોકાણકારો માટે આદર્શ.`,
      landType: 'Agricultural',
      landTypeGu: 'કૃષિ',
      waterSource: 'Borewell + Canal',
      waterSourceGu: 'બોરવેલ + કેનાલ',
      soilType: 'Black Cotton Soil',
      soilTypeGu: 'કાળી કપાસ માટી',
      irrigation: 'Drip + Sprinkler',
      irrigationGu: 'ડ્રિપ + સ્પ્રિંકલર',
      roadAccess: 'Paved Road',
      roadAccessGu: 'પાકા રસ્તા',
      legalStatus: 'Clear Title',
      legalStatusGu: 'સ્પષ્ટ ટાઇટલ',
      surveyNumber: 'SY-123/2A',
      listedDate: '2025-01-10',
      lastUpdated: '2025-01-15',
      viewCount: 245,
      inquiries: 18,
      latitude: 22.5645,
      longitude: 72.9289,
      images: [
        'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
        'https://images.pixabay.com/photo-2016/11/29/05/45/astronomy-1867616_1280.jpg',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
        'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
        'https://images.pixabay.com/photo-2018/01/29/17/01/agriculture-3116382_1280.jpg'
      ],
      features: [
        { en: 'Fertile black cotton soil', gu: 'ફળદ્રુપ કાળી કપાસ માટી' },
        { en: 'Dual water source (Borewell + Canal)', gu: 'દ્વિ પાણી સ્ત્રોત (બોરવેલ + કેનાલ)' },
        { en: 'Modern drip irrigation system', gu: 'આધુનિક ડ્રિપ સિંચાઈ સિસ્ટમ' },
        { en: 'Direct road access', gu: 'સીધી રોડ એક્સેસ' },
        { en: 'Electricity connection available', gu: 'વીજળી કનેક્શન ઉપલબ્ધ' },
        { en: 'Clear land title', gu: 'સ્પષ્ટ જમીન ટાઇટલ' },
        { en: 'Suitable for multiple crops', gu: 'બહુવિધ પાકો માટે યોગ્ય' },
        { en: 'Good market connectivity', gu: 'સારી બજાર કનેક્ટિવિટી' }
      ],
      nearbyAmenities: [
        { name: 'Anand Agricultural Market', nameGu: 'આણંદ કૃષિ બજાર', distance: '2.5 km' },
        { name: 'Primary Health Center', nameGu: 'પ્રાથમિક આરોગ્ય કેન્દ્ર', distance: '1.8 km' },
        { name: 'Government School', nameGu: 'સરકારી શાળા', distance: '1.2 km' },
        { name: 'Bank Branch', nameGu: 'બેંક શાખા', distance: '3.0 km' },
        { name: 'Fertilizer Shop', nameGu: 'ખાતર દુકાન', distance: '1.5 km' }
      ],
      seller: {
        id: 'seller-001',
        name: 'Ramesh Patel',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        phone: '+91 98765 43210',
        rating: 4.8,
        reviewCount: 24,
        location: 'Anand, Gujarat',
        totalListings: 12,
        soldProperties: 8,
        yearsExperience: 15
      }
    };

    setProperty(mockProperty);
    setLoading(false);

    // Increment view count
    setTimeout(() => {
      setProperty(prev => ({
        ...prev,
        viewCount: prev.viewCount + 1
      }));
    }, 2000);
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                {language === 'en' ? 'Loading property details...' : 'પ્રોપર્ટી વિગતો લોડ થઈ રહી છે...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              {language === 'en' ? 'Property Not Found' : 'પ્રોપર્ટી મળી નથી'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'en' ?'The property you are looking for does not exist or has been removed.' :'તમે જે પ્રોપર્ટી શોધી રહ્યા છો તે અસ્તિત્વમાં નથી અથવા દૂર કરવામાં આવી છે.'
              }
            </p>
            <Link to="/property-listings-search">
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-micro">
                {language === 'en' ? 'Browse Properties' : 'પ્રોપર્ટીઝ બ્રાઉઝ કરો'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/home-landing-page" className="hover:text-foreground transition-micro">
            {language === 'en' ? 'Home' : 'હોમ'}
          </Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/property-listings-search" className="hover:text-foreground transition-micro">
            {language === 'en' ? 'Properties' : 'પ્રોપર્ટીઝ'}
          </Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground font-medium line-clamp-1">
            {language === 'en' ? property.title : property.titleGu}
          </span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <PropertyImageGallery 
              images={property.images} 
              propertyName={language === 'en' ? property.title : property.titleGu}
            />

            {/* Property Information */}
            <PropertyInfo property={property} />

            {/* Property Map */}
            <PropertyMap property={property} />

            {/* Related Properties */}
            <RelatedProperties 
              currentPropertyId={property.id}
              district={property.district}
              taluka={property.taluka}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Seller Contact */}
            <SellerContact 
              seller={property.seller}
              propertyId={property.id}
            />

            {/* Property Actions */}
            <PropertyActions property={property} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} AgroLand Portal. {language === 'en' ? 'All rights reserved.' : 'બધા અધિકારો આરક્ષિત.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetailView;