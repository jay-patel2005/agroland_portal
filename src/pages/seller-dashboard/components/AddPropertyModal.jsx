import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import propertyService from '../../../utils/propertyService';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddPropertyModal = ({ isOpen, onClose, onSuccess, language }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'agricultural',
    price: '',
    area: '',
    location_village: '',
    location_taluka: '',
    location_district: '',
    amenities: []
  });

  const propertyTypes = [
    { value: 'agricultural', label: language === 'en' ? 'Agricultural' : 'કૃષિ' },
    { value: 'residential', label: language === 'en' ? 'Residential' : 'રહેણાંક' },
    { value: 'commercial', label: language === 'en' ? 'Commercial' : 'વાણિજ્યિક' },
    { value: 'industrial', label: language === 'en' ? 'Industrial' : 'ઔદ્યોગિક' }
  ];

  const commonAmenities = [
    'Water Connection', 'Electricity', 'Road Access', 'Irrigation', 'Fencing',
    'Storage Facility', 'Tube Well', 'Drainage', 'Transportation', 'Market Access'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError(language === 'en' ? 'Please log in to add property' : 'પ્રોપર્ટી ઉમેરવા માટે લોગિન કરો');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const propertyData = {
        ...formData,
        seller_id: user.id,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area)
      };

      const result = await propertyService.createProperty(propertyData);

      if (result.success) {
        onSuccess?.(result.data);
        onClose();
        // Reset form
        setFormData({
          title: '',
          description: '',
          property_type: 'agricultural',
          price: '',
          area: '',
          location_village: '',
          location_taluka: '',
          location_district: '',
          amenities: []
        });
      } else {
        setError(result.error || (language === 'en' ? 'Failed to add property' : 'પ્રોપર્ટી ઉમેરવામાં નિષ્ફળ'));
      }
    } catch (err) {
      setError(language === 'en' ? 'Something went wrong. Please try again.' : 'કંઈક ખોટું થયું છે. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'en' ? 'Add New Property' : 'નવી પ્રોપર્ટી ઉમેરો'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {language === 'en' ? 'Basic Information' : 'મૂળભૂત માહિતી'}
            </h3>
            
            <Input
              label={language === 'en' ? 'Property Title' : 'પ્રોપર્ટી શીર્ષક'}
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter property title' : 'પ્રોપર્ટી શીર્ષક દાખલ કરો'}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {language === 'en' ? 'Description' : 'વર્ણન'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={language === 'en' ? 'Describe your property...' : 'તમારી પ્રોપર્ટીનું વર્ણન કરો...'}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  {language === 'en' ? 'Property Type' : 'પ્રોપર્ટીનો પ્રકાર'}
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label={language === 'en' ? 'Price (₹)' : 'કિંમત (₹)'}
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>

            <Input
              label={language === 'en' ? 'Area (sq ft)' : 'વિસ્તાર (ચો. ફૂટ)'}
              name="area"
              type="number"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="0"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {language === 'en' ? 'Location Details' : 'સ્થળની વિગતો'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label={language === 'en' ? 'Village' : 'ગામ'}
                name="location_village"
                value={formData.location_village}
                onChange={handleInputChange}
                placeholder={language === 'en' ? 'Village name' : 'ગામનું નામ'}
                required
              />

              <Input
                label={language === 'en' ? 'Taluka' : 'તાલુકો'}
                name="location_taluka"
                value={formData.location_taluka}
                onChange={handleInputChange}
                placeholder={language === 'en' ? 'Taluka name' : 'તાલુકાનું નામ'}
                required
              />

              <Input
                label={language === 'en' ? 'District' : 'જિલ્લો'}
                name="location_district"
                value={formData.location_district}
                onChange={handleInputChange}
                placeholder={language === 'en' ? 'District name' : 'જિલ્લાનું નામ'}
                required
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {language === 'en' ? 'Amenities' : 'સુવિધાઓ'}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonAmenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {language === 'en' ? 'Cancel' : 'રદ કરો'}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  {language === 'en' ? 'Adding...' : 'ઉમેરી રહ્યું છે...'}
                </div>
              ) : (
                language === 'en' ? 'Add Property' : 'પ્રોપર્ટી ઉમેરો'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;