import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: {
        color: 'bg-success text-success-foreground',
        text: language === 'en' ? 'Available' : 'ઉપલબ્ધ'
      },
      sold: {
        color: 'bg-destructive text-destructive-foreground',
        text: language === 'en' ? 'Sold' : 'વેચાઈ ગયેલ'
      },
      pending: {
        color: 'bg-warning text-warning-foreground',
        text: language === 'en' ? 'Under Review' : 'સમીક્ષા હેઠળ'
      }
    };

    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getPropertyTypeLabel = (type) => {
    const typeLabels = {
      agricultural: language === 'en' ? 'Agricultural Land' : 'કૃષિ જમીન',
      residential: language === 'en' ? 'Residential Plot' : 'રહેણાંક પ્લોટ',
      commercial: language === 'en' ? 'Commercial Land' : 'વ્યાવસાયિક જમીન',
      industrial: language === 'en' ? 'Industrial Plot' : 'ઔદ્યોગિક પ્લોટ'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-state group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-layout"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(property.status)}
        </div>

        {/* View Count */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
          <Icon name="Eye" size={12} />
          <span>{property.viewCount}</span>
        </div>

        {/* Property Type */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            {getPropertyTypeLabel(property.type)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span className="line-clamp-1">
            {property.village}, {property.taluka}, {property.district}
          </span>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Icon name="Maximize" size={14} className="mr-2" />
            <span>{property.size} {language === 'en' ? 'Acres' : 'એકર'}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Icon name="Calendar" size={14} className="mr-2" />
            <span>{new Date(property.listedDate).toLocaleDateString('en-IN')}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/property-detail-view?id=${property.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              {language === 'en' ? 'View Details' : 'વિગતો જુઓ'}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="default"
            iconName="Heart"
            className="px-3"
            onClick={() => {
              // Handle save to favorites
              console.log('Save to favorites:', property.id);
            }}
          />
          <Button
            variant="outline"
            size="default"
            iconName="Share2"
            className="px-3"
            onClick={() => {
              // Handle share
              if (navigator.share) {
                navigator.share({
                  title: property.title,
                  text: property.description,
                  url: window.location.href
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;