import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const PropertyInfo = ({ property }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatArea = (area) => {
    return new Intl.NumberFormat('en-IN').format(area);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border-success/20';
      case 'sold':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      en: {
        available: 'Available',
        sold: 'Sold',
        pending: 'Pending'
      },
      gu: {
        available: 'ઉપલબ્ધ',
        sold: 'વેચાયેલ',
        pending: 'બાકી'
      }
    };
    return statusMap[language][status] || status;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2">
      {/* Property Title and Status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-muted-foreground mb-2">
            <Icon name="MapPin" size={16} className="mr-2" />
            <span className="text-sm">
              {property.village}, {property.taluka}, {property.district}
            </span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(property.status)}`}>
          {getStatusText(property.status)}
        </div>
      </div>

      {/* Price and Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {language === 'en' ? 'Price' : 'કિંમત'}
          </div>
          <div className="text-xl font-bold text-primary">
            {formatPrice(property.price)}
          </div>
          <div className="text-xs text-muted-foreground">
            ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/acre
          </div>
        </div>

        <div className="bg-secondary/5 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {language === 'en' ? 'Area' : 'વિસ્તાર'}
          </div>
          <div className="text-xl font-bold text-secondary">
            {formatArea(property.area)} {language === 'en' ? 'acres' : 'એકર'}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {language === 'en' ? 'Land Type' : 'જમીનનો પ્રકાર'}
          </div>
          <div className="text-lg font-semibold text-foreground">
            {language === 'en' ? property.landType : property.landTypeGu}
          </div>
        </div>

        <div className="bg-accent rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {language === 'en' ? 'Water Source' : 'પાણીનો સ્ત્રોત'}
          </div>
          <div className="text-lg font-semibold text-foreground">
            {language === 'en' ? property.waterSource : property.waterSourceGu}
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          {language === 'en' ? 'Description' : 'વર્ણન'}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {language === 'en' ? property.description : property.descriptionGu}
        </p>
      </div>

      {/* Property Features */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          {language === 'en' ? 'Features' : 'વિશેષતાઓ'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span className="text-sm text-foreground">
                {language === 'en' ? feature.en : feature.gu}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Specifications */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          {language === 'en' ? 'Specifications' : 'વિશિષ્ટતાઓ'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Soil Type' : 'માટીનો પ્રકાર'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {language === 'en' ? property.soilType : property.soilTypeGu}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Irrigation' : 'સિંચાઈ'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {language === 'en' ? property.irrigation : property.irrigationGu}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Road Access' : 'રસ્તાની સુવિધા'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {language === 'en' ? property.roadAccess : property.roadAccessGu}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Legal Status' : 'કાનૂની સ્થિતિ'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {language === 'en' ? property.legalStatus : property.legalStatusGu}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Survey Number' : 'સર્વે નંબર'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {property.surveyNumber}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {language === 'en' ? 'Listed Date' : 'સૂચિબદ્ધ તારીખ'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {new Date(property.listedDate).toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;