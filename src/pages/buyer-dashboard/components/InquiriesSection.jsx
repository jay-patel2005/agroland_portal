import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import inquiryService from '../../../utils/inquiryService';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InquiriesSection = ({ language = 'en' }) => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, open, responded, closed

  useEffect(() => {
    loadInquiries();
  }, [user, filter]);

  const loadInquiries = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await inquiryService.getInquiriesByBuyer(user.id);
      
      if (result.success) {
        let filteredInquiries = result.data || [];
        
        if (filter !== 'all') {
          filteredInquiries = filteredInquiries.filter(inquiry => inquiry.status === filter);
        }
        
        setInquiries(filteredInquiries);
      } else {
        setError(result.error || 'Failed to load inquiries');
      }
    } catch (err) {
      setError('Something went wrong loading inquiries');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-50';
      case 'responded': return 'text-green-600 bg-green-50';
      case 'closed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    if (language === 'en') {
      switch (status) {
        case 'open': return 'Open';
        case 'responded': return 'Responded';
        case 'closed': return 'Closed';
        default: return status;
      }
    } else {
      switch (status) {
        case 'open': return 'ખુલ્લી';
        case 'responded': return 'જવાબ આપ્યો';
        case 'closed': return 'બંધ';
        default: return status;
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'gu-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-elevation-1">
        <div className="flex items-center justify-center">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            {language === 'en' ? 'Loading inquiries...' : 'પૂછપરછ લોડ કરી રહ્યું છે...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {language === 'en' ? 'My Inquiries' : 'મારી પૂછપરછ'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en' ?'Track your property inquiries and responses' :'તમારી પ્રોપર્ટી પૂછપરછ અને જવાબોને ટ્રેક કરો'
              }
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={loadInquiries}>
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: language === 'en' ? 'All' : 'બધા' },
            { key: 'open', label: language === 'en' ? 'Open' : 'ખુલ્લી' },
            { key: 'responded', label: language === 'en' ? 'Responded' : 'જવાબ આપ્યો' },
            { key: 'closed', label: language === 'en' ? 'Closed' : 'બંધ' }
          ].map(filterOption => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {error && (
          <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadInquiries}
              className="mt-2"
            >
              {language === 'en' ? 'Retry' : 'ફરી પ્રયાસ કરો'}
            </Button>
          </div>
        )}

        {inquiries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={32} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              {language === 'en' ? 'No Inquiries Found' : 'કોઈ પૂછપરછ મળી નથી'}
            </h4>
            <p className="text-muted-foreground mb-6">
              {language === 'en' 
                ? filter === 'all' ?'You haven\'t made any inquiries yet. Start by browsing properties and asking questions.'
                  : `No ${filter} inquiries found.`
                : filter === 'all' ?'તમે હજુ સુધી કોઈ પૂછપરછ કરી નથી. પ્રોપર્ટીઝ બ્રાઉઝ કરીને અને પ્રશ્નો પૂછીને શરૂઆત કરો.'
                  : `કોઈ ${getStatusText(filter)} પૂછપરછ મળી નથી.`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => window.location.href = '/property-listings-search'}>
                {language === 'en' ? 'Browse Properties' : 'પ્રોપર્ટીઝ બ્રાઉઝ કરો'}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      {inquiry.property?.title || 'Property'}
                    </h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {inquiry.property?.location_village}, {inquiry.property?.location_district}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {getStatusText(inquiry.status)}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    {language === 'en' ? 'Your Message:' : 'તમારો સંદેશ:'}
                  </div>
                  <p className="text-sm text-foreground bg-muted/30 rounded p-2">
                    {inquiry.message}
                  </p>
                </div>

                {inquiry.response && (
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-1">
                      {language === 'en' ? 'Seller Response:' : 'વેચનારનો જવાબ:'}
                    </div>
                    <p className="text-sm text-foreground bg-green-50 border border-green-200 rounded p-2">
                      {inquiry.response}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {language === 'en' ? 'Sent:' : 'મોકલેલ:'} {formatDate(inquiry.created_at)}
                  </span>
                  {inquiry.updated_at !== inquiry.created_at && (
                    <span>
                      {language === 'en' ? 'Updated:' : 'અપડેટ થયેલ:'} {formatDate(inquiry.updated_at)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiriesSection;