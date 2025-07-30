import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import propertyService from '../../../utils/propertyService';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PropertyCard from './PropertyCard';

const SavedPropertiesSection = ({ language = 'en' }) => {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, [user]);

  const loadSavedProperties = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await propertyService.getSavedProperties(user.id);
      
      if (result.success) {
        // Transform the data to match PropertyCard expectations
        const transformedData = result.data?.map(item => ({
          ...item.property,
          saved: true,
          savedId: item.id
        })) || [];
        setSavedProperties(transformedData);
      } else {
        setError(result.error || 'Failed to load saved properties');
      }
    } catch (err) {
      setError('Something went wrong loading saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      const result = await propertyService.removeSavedProperty(user.id, propertyId);
      
      if (result.success) {
        setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
      } else {
        alert(result.error || 'Failed to remove property from saved list');
      }
    } catch (err) {
      alert('Something went wrong removing the property');
    }
  };

  const handleSaveProperty = async (propertyId) => {
    // This shouldn't be called for saved properties, but included for completeness
    console.log('Property already saved:', propertyId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-elevation-1">
        <div className="flex items-center justify-center">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            {language === 'en' ? 'Loading saved properties...' : 'સાચવેલી પ્રોપર્ટીઝ લોડ કરી રહ્યું છે...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {language === 'en' ? 'Saved Properties' : 'સાચવેલી પ્રોપર્ટીઝ'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en' ?'Properties you have saved for later viewing' :'જે પ્રોપર્ટીઝ તમે પછીથી જોવા માટે સાચવી છે'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {savedProperties.length} {language === 'en' ? 'saved' : 'સાચવેલ'}
            </span>
            <Button variant="ghost" size="sm" onClick={loadSavedProperties}>
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
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
              onClick={loadSavedProperties}
              className="mt-2"
            >
              {language === 'en' ? 'Retry' : 'ફરી પ્રયાસ કરો'}
            </Button>
          </div>
        )}

        {savedProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={32} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              {language === 'en' ? 'No Saved Properties' : 'કોઈ સાચવેલી પ્રોપર્ટી નથી'}
            </h4>
            <p className="text-muted-foreground mb-6">
              {language === 'en' ?'Save properties you like to view them later and compare options.' :'જે પ્રોપર્ટીઝ તમને ગમે તેને સાચવो અને પછીથી તેને જુઓ અને વિકલ્પોની સરખામણી કરો.'
              }
            </p>
            <Button onClick={() => window.location.href = '/property-listings-search'}>
              {language === 'en' ? 'Browse Properties' : 'પ્રોપર્ટીઝ બ્રાઉઝ કરો'}
            </Button>
          </div>
        ) : (
          <>
            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {savedProperties.slice(0, 6).map((property) => (
                <div key={property.id} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Property Image */}
                  <div className="aspect-video bg-muted relative">
                    {property.images?.length > 0 ? (
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="Building2" size={32} className="text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProperty(property.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                    >
                      <Icon name="Heart" size={16} fill="currentColor" />
                    </Button>

                    {/* Property Type Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                        {property.property_type}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-4">
                    <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                      {property.title}
                    </h4>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {property.location_village}, {property.location_district}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-foreground">
                          {formatPrice(property.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {property.area} sq ft
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'View Details' : 'વિગતો જુઓ'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {savedProperties.length > 6 && (
              <div className="text-center">
                <Button variant="outline">
                  {language === 'en' ? 'View All Saved Properties' : 'બધી સાચવેલી પ્રોપર્ટીઝ જુઓ'}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesSection;