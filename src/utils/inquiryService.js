import { supabase } from './supabase';

class InquiryService {
  // Create new inquiry
  async createInquiry(inquiryData) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([inquiryData])
        .select(`
          *,
          property:property_id (
            id,
            title,
            location_village,
            location_district
          )
        `)
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
      return { success: false, error: 'Failed to create inquiry' };
    }
  }

  // Get inquiries by buyer
  async getInquiriesByBuyer(buyerId) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          property:property_id (
            id,
            title,
            location_village,
            location_district,
            seller:seller_id (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('buyer_id', buyerId)
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
      return { success: false, error: 'Failed to load inquiries' };
    }
  }

  // Get inquiries by property (for sellers)
  async getInquiriesByProperty(propertyId) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          buyer:buyer_id (
            id,
            full_name,
            email,
            phone
          ),
          property:property_id (
            id,
            title
          )
        `)
        .eq('property_id', propertyId)
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
      return { success: false, error: 'Failed to load property inquiries' };
    }
  }

  // Get inquiries for seller's properties
  async getInquiriesForSeller(sellerId) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          buyer:buyer_id (
            id,
            full_name,
            email,
            phone
          ),
          property:property_id (
            id,
            title,
            seller_id
          )
        `)
        .eq('property.seller_id', sellerId)
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
      return { success: false, error: 'Failed to load seller inquiries' };
    }
  }

  // Update inquiry (mainly for sellers to respond)
  async updateInquiry(inquiryId, updates) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update(updates)
        .eq('id', inquiryId)
        .select(`
          *,
          buyer:buyer_id (
            id,
            full_name,
            email,
            phone
          ),
          property:property_id (
            id,
            title
          )
        `)
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
      return { success: false, error: 'Failed to update inquiry' };
    }
  }

  // Respond to inquiry (for sellers)
  async respondToInquiry(inquiryId, response) {
    try {
      const updates = {
        response,
        status: 'responded',
        updated_at: new Date().toISOString()
      };

      const result = await this.updateInquiry(inquiryId, updates);
      return result;
    } catch (error) {
      return { success: false, error: 'Failed to respond to inquiry' };
    }
  }

  // Close inquiry
  async closeInquiry(inquiryId) {
    try {
      const updates = {
        status: 'closed',
        updated_at: new Date().toISOString()
      };

      const result = await this.updateInquiry(inquiryId, updates);
      return result;
    } catch (error) {
      return { success: false, error: 'Failed to close inquiry' };
    }
  }

  // Delete inquiry
  async deleteInquiry(inquiryId) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', inquiryId);

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
      return { success: false, error: 'Failed to delete inquiry' };
    }
  }

  // Get inquiry statistics for seller
  async getInquiryStats(sellerId) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          status,
          property:property_id (
            seller_id
          )
        `)
        .eq('property.seller_id', sellerId);

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        open: data?.filter(i => i.status === 'open').length || 0,
        responded: data?.filter(i => i.status === 'responded').length || 0,
        closed: data?.filter(i => i.status === 'closed').length || 0
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to load inquiry statistics' };
    }
  }
}

export default new InquiryService();