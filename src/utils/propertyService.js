import { supabase } from './supabase';

class PropertyService {
  // Get all properties with optional filtering
  async getProperties(filters = {}) {
    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          seller:seller_id (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('status', 'active');

      // Apply filters
      if (filters?.property_type) {
        query = query.eq('property_type', filters.property_type);
      }

      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }

      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }

      if (filters?.location_district) {
        query = query.eq('location_district', filters.location_district);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location_village.ilike.%${filters.search}%`);
      }

      // Sorting
      const sortBy = filters?.sort_by || 'created_at';
      const sortOrder = filters?.sort_order || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load properties' };
    }
  }

  // Get single property by ID
  async getProperty(propertyId) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          seller:seller_id (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('id', propertyId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load property' };
    }
  }

  // Get properties by seller
  async getPropertiesBySeller(sellerId) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load seller properties' };
    }
  }

  // Create new property
  async createProperty(propertyData) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create property' };
    }
  }

  // Update property
  async updateProperty(propertyId, updates) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', propertyId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update property' };
    }
  }

  // Delete property
  async deleteProperty(propertyId) {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete property' };
    }
  }

  // Increment property views
  async incrementPropertyViews(propertyId) {
    try {
      const { error } = await supabase.rpc('increment_property_views', {
        property_id: propertyId
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update views' };
    }
  }

  // Get saved properties for a user
  async getSavedProperties(userId) {
    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .select(`
          *,
          property:property_id (
            *,
            seller:seller_id (
              id,
              full_name,
              email,
              phone
            )
          )
        `)
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load saved properties' };
    }
  }

  // Save property
  async saveProperty(userId, propertyId) {
    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .insert([{ user_id: userId, property_id: propertyId }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to save property' };
    }
  }

  // Remove saved property
  async removeSavedProperty(userId, propertyId) {
    try {
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to remove saved property' };
    }
  }
}

export default new PropertyService();