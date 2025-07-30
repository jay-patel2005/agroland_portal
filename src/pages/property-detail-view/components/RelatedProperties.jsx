import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProperties = ({ currentPropertyId, district, taluka }) => {
  const [language, setLanguage] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const relatedProperties = [
    {
      id: 'prop-002',
      title: 'Premium Agricultural Land in Anand',
      titleGu: 'આણંદમાં પ્રીમિયમ કૃષિ જમીન',
      price: 1200000,
      area: 3.5,
      location: 'Anand, Anand, Gujarat',
      locationGu: 'આણંદ, આણંદ, ગુજરાત',
      image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
      landType: 'Agricultural',
      landTypeGu: 'કૃષિ',
      waterSource: 'Borewell',
      waterSourceGu: 'બોરવેલ',
      status: 'available'
    },
    {
      id: 'prop-003',
      title: 'Fertile Farmland with Water Access',
      titleGu: 'પાણીની સુવિધા સાથે ફળદ્રુપ ખેતીની જમીન',
      price: 950000,
      area: 2.8,
      location: 'Kheda, Kheda, Gujarat',
      locationGu: 'ખેડા, ખેડા, ગુજરાત',
      image: 'https://images.pixabay.com/photo-2016/11/29/05/45/astronomy-1867616_1280.jpg',
      landType: 'Agricultural',
      landTypeGu: 'કૃષિ',
      waterSource: 'Canal',
      waterSourceGu: 'કેનાલ',
      status: 'available'
    },
    {
      id: 'prop-004',
      title: 'Commercial Land Near Highway',
      titleGu: 'હાઇવે પાસે વ્યાપારી જમીન',
      price: 2500000,
      area: 1.5,
      location: 'Vadodara, Vadodara, Gujarat',
      locationGu: 'વડોદરા, વડોદરા, ગુજરાત',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      landType: 'Commercial',
      landTypeGu: 'વ્યાપારી',
      waterSource: 'Municipal',
      waterSourceGu: 'મ્યુનિસિપલ',
      status: 'available'
    },
    {
      id: 'prop-005',
      title: 'Organic Farming Ready Land',
      titleGu: 'ઓર્ગેનિક ફાર્મિંગ માટે તૈયાર જમીન',
      price: 800000,
      area: 4.2,
      location: 'Bharuch, Bharuch, Gujarat',
      locationGu: 'ભરૂચ, ભરૂચ, ગુજરાત',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      landType: 'Agricultural',
      landTypeGu: 'કૃષિ',
      waterSource: 'River',
      waterSourceGu: 'નદી',
      status: 'available'
    }
  ];

  const filteredProperties = relatedProperties.filter(prop => prop.id !== currentPropertyId);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentProperties = () => {
    const startIndex = currentIndex * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  };

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

  if (filteredProperties.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-bold text-foreground">
          {language === 'en' ? 'Related Properties' : 'સંબંધિત પ્રોપર્ટીઝ'}
        </h3>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentProperties().map((property) => (
          <Link
            key={property.id}
            to={`/property-detail-view?id=${property.id}`}
            className="group block"
          >
            <div className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-elevation-2 transition-state">
              {/* Property Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={property.image}
                  alt={language === 'en' ? property.title : property.titleGu}
                  className="w-full h-full object-cover group-hover:scale-105 transition-state"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {language === 'en' ? 'Available' : 'ઉપલબ્ધ'}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                  {language === 'en' ? property.title : property.titleGu}
                </h4>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  <span className="line-clamp-1">
                    {language === 'en' ? property.location : property.locationGu}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Price' : 'કિંમત'}
                    </div>
                    <div className="font-bold text-primary">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Area' : 'વિસ્તાર'}
                    </div>
                    <div className="font-semibold text-foreground">
                      {formatArea(property.area)} {language === 'en' ? 'acres' : 'એકર'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="Layers" size={12} className="mr-1" />
                    <span>{language === 'en' ? property.landType : property.landTypeGu}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Droplets" size={12} className="mr-1" />
                    <span>{language === 'en' ? property.waterSource : property.waterSourceGu}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <Link to="/property-listings-search">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            {language === 'en' ? 'View All Properties' : 'બધી પ્રોપર્ટીઝ જુઓ'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProperties;