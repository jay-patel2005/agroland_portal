import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import propertyService from '../../../utils/propertyService';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AddPropertyModal from './AddPropertyModal';

const PropertyTable = ({ language }) => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadProperties();
  }, [user]);

  const loadProperties = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await propertyService.getPropertiesBySeller(user.id);
      
      if (result.success) {
        setProperties(result.data || []);
      } else {
        setError(result.error || 'Failed to load properties');
      }
    } catch (err) {
      setError('Something went wrong loading properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm(language === 'en' ? 'Are you sure you want to delete this property?' : 'શું તમે ચોક્કસ આ પ્રોપર્ટી ડિલીટ કરવા માંગો છો?')) {
      return;
    }

    try {
      setActionLoading(propertyId);
      const result = await propertyService.deleteProperty(propertyId);
      
      if (result.success) {
        setProperties(prev => prev.filter(p => p.id !== propertyId));
      } else {
        alert(result.error || (language === 'en' ? 'Failed to delete property' : 'પ્રોપર્ટી ડિલીટ કરવામાં નિષ્ફળ'));
      }
    } catch (err) {
      alert(language === 'en' ? 'Something went wrong' : 'કંઈક ખોટું થયું');
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusUpdate = async (propertyId, newStatus) => {
    try {
      setActionLoading(propertyId);
      const result = await propertyService.updateProperty(propertyId, { status: newStatus });
      
      if (result.success) {
        setProperties(prev => prev.map(p => 
          p.id === propertyId ? { ...p, status: newStatus } : p
        ));
      } else {
        alert(result.error || (language === 'en' ? 'Failed to update status' : 'સ્ટેટસ અપડેટ કરવામાં નિષ્ફળ'));
      }
    } catch (err) {
      alert(language === 'en' ? 'Something went wrong' : 'કંઈક ખોટું થયું');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePropertyAdded = (newProperty) => {
    setProperties(prev => [newProperty, ...prev]);
    setShowAddModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'sold': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    if (language === 'en') {
      switch (status) {
        case 'active': return 'Active';
        case 'sold': return 'Sold';
        case 'pending': return 'Pending';
        case 'expired': return 'Expired';
        default: return status;
      }
    } else {
      switch (status) {
        case 'active': return 'સક્રિય';
        case 'sold': return 'વેચાયેલ';
        case 'pending': return 'બાકી';
        case 'expired': return 'સમય સમાપ્ત';
        default: return status;
      }
    }
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
      <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-8">
        <div className="flex items-center justify-center">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            {language === 'en' ? 'Loading properties...' : 'પ્રોપર્ટીઝ લોડ કરી રહ્યું છે...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-lg border border-border shadow-elevation-1">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'My Properties' : 'મારી પ્રોપર્ટીઝ'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' ? 'Manage and track your property listings' : 'તમારી પ્રોપર્ટી લિસ્ટિંગ્સ મેનેજ કરો અને ટ્રેક કરો'}
              </p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              iconName="Plus" 
              iconPosition="left"
            >
              {language === 'en' ? 'Add Property' : 'પ્રોપર્ટી ઉમેરો'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="AlertCircle" size={16} />
                {error}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={loadProperties}
                className="mt-2"
              >
                {language === 'en' ? 'Retry' : 'ફરી પ્રયાસ કરો'}
              </Button>
            </div>
          )}

          {properties.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Building2" size={32} className="text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">
                {language === 'en' ? 'No Properties Listed' : 'કોઈ પ્રોપર્ટી લિસ્ટ નથી'}
              </h4>
              <p className="text-muted-foreground mb-6">
                {language === 'en' ?'Start by adding your first property listing to reach potential buyers.' :'સંભવિત ખરીદદારો સુધી પહોંચવા માટે તમારી પ્રથમ પ્રોપર્ટી લિસ્ટિંગ ઉમેરીને શરૂઆત કરો.'
                }
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                {language === 'en' ? 'Add Your First Property' : 'તમારી પ્રથમ પ્રોપર્ટી ઉમેરો'}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Property' : 'પ્રોપર્ટી'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Type' : 'પ્રકાર'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Price' : 'કિંમત'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Status' : 'સ્થિતિ'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Views' : 'જોવાયેલા'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'en' ? 'Actions' : 'ક્રિયાઓ'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id} className="border-b border-border hover:bg-muted/20">
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium text-foreground text-sm">
                            {property.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {property.location_village}, {property.location_district}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="capitalize text-sm text-foreground">
                          {property.property_type}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm font-medium text-foreground">
                          {formatPrice(property.price)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          {getStatusText(property.status)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm text-muted-foreground">
                          {property.views_count || 0}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          {property.status === 'active' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusUpdate(property.id, 'sold')}
                              disabled={actionLoading === property.id}
                            >
                              {actionLoading === property.id ? (
                                <Icon name="Loader2" size={14} className="animate-spin" />
                              ) : (
                                <Icon name="CheckCircle" size={14} />
                              )}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProperty(property.id)}
                            disabled={actionLoading === property.id}
                            className="text-destructive hover:text-destructive"
                          >
                            {actionLoading === property.id ? (
                              <Icon name="Loader2" size={14} className="animate-spin" />
                            ) : (
                              <Icon name="Trash2" size={14} />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddPropertyModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handlePropertyAdded}
        language={language}
      />
    </>
  );
};

export default PropertyTable;