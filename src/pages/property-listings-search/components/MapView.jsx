import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties, selectedProperty, onPropertySelect }) => {
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

  // Mock coordinates for demonstration
  const getPropertyCoordinates = (property) => {
    const baseCoords = {
      ahmedabad: { lat: 23.0225, lng: 72.5714 },
      surat: { lat: 21.1702, lng: 72.8311 },
      vadodara: { lat: 22.3072, lng: 73.1812 },
      rajkot: { lat: 22.3039, lng: 70.8022 },
      bhavnagar: { lat: 21.7645, lng: 72.1519 }
    };

    const base = baseCoords[property.district] || baseCoords.ahmedabad;
    
    // Add some random offset for different properties
    const offset = 0.01;
    return {
      lat: base.lat + (Math.random() - 0.5) * offset,
      lng: base.lng + (Math.random() - 0.5) * offset
    };
  };

  return (
    <div className="h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="relative h-full">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Properties Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=23.0225,72.5714&z=10&output=embed"
          className="w-full h-full"
        />

        {/* Property Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {properties.slice(0, 10).map((property, index) => {
            const coords = getPropertyCoordinates(property);
            const isSelected = selectedProperty?.id === property.id;
            
            return (
              <div
                key={property.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${20 + (index % 5) * 15}%`,
                  top: `${20 + Math.floor(index / 5) * 20}%`
                }}
              >
                <Button
                  variant={isSelected ? "default" : "secondary"}
                  size="sm"
                  onClick={() => onPropertySelect(property)}
                  className={`
                    relative rounded-full w-8 h-8 p-0 shadow-elevation-2
                    ${isSelected ? 'z-10 scale-110' : 'hover:scale-105'}
                    transition-all duration-200
                  `}
                >
                  <Icon name="MapPin" size={16} />
                </Button>

                {/* Property Info Popup */}
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-lg shadow-elevation-3 p-3 z-20">
                    <div className="text-sm">
                      <h4 className="font-medium text-foreground mb-1 line-clamp-1">
                        {property.title}
                      </h4>
                      <p className="text-primary font-semibold mb-1">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-muted-foreground text-xs mb-2">
                        {property.village}, {property.taluka}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{property.size} {language === 'en' ? 'Acres' : 'એકર'}</span>
                        <span className="flex items-center">
                          <Icon name="Eye" size={12} className="mr-1" />
                          {property.viewCount}
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 shadow-elevation-2"
            onClick={() => {
              // Zoom in functionality
              console.log('Zoom in');
            }}
          >
            <Icon name="Plus" size={16} />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 shadow-elevation-2"
            onClick={() => {
              // Zoom out functionality
              console.log('Zoom out');
            }}
          >
            <Icon name="Minus" size={16} />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 shadow-elevation-2"
            onClick={() => {
              // Reset view functionality
              console.log('Reset view');
            }}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <h4 className="text-sm font-medium text-foreground mb-2">
            {language === 'en' ? 'Legend' : 'દંતકથા'}
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground">
                {language === 'en' ? 'Available' : 'ઉપલબ્ધ'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-muted-foreground">
                {language === 'en' ? 'Selected' : 'પસંદ કરેલ'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;