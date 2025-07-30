import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedProperties = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const featuredProperties = [
    {
      id: 1,
      title: language === 'en' ? 'Premium Agricultural Land in Sanand' : 'સાણંદમાં પ્રીમિયમ કૃષિ જમીન',
      location: language === 'en' ? 'Sanand, Ahmedabad' : 'સાણંદ, અમદાવાદ',
      price: '₹12,50,000',
      area: language === 'en' ? '2.5 Acres' : '2.5 એકર',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Water Connection', 'Road Access', 'Fertile Soil', 'Clear Title']
        : ['પાણીનું કનેક્શન', 'રોડ એક્સેસ', 'ફળદ્રુપ માટી', 'સ્પષ્ટ ટાઇટલ'],
      views: 245,
      isVerified: true
    },
    {
      id: 2,
      title: language === 'en' ? 'Organic Farm Land in Vadodara' : 'વડોદરામાં ઓર્ગેનિક ફાર્મ લેન્ડ',
      location: language === 'en' ? 'Padra, Vadodara' : 'પાદરા, વડોદરા',
      price: '₹8,75,000',
      area: language === 'en' ? '1.8 Acres' : '1.8 એકર',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Organic Certified', 'Drip Irrigation', 'Storage Facility', 'Power Supply']
        : ['ઓર્ગેનિક પ્રમાણિત', 'ડ્રિપ સિંચાઈ', 'સ્ટોરેજ સુવિધા', 'પાવર સપ્લાય'],
      views: 189,
      isVerified: true
    },
    {
      id: 3,
      title: language === 'en' ? 'Mango Orchard in Surat' : 'સુરતમાં કેરીનો બગીચો',
      location: language === 'en' ? 'Chorasi, Surat' : 'ચોરાસી, સુરત',
      price: '₹15,25,000',
      area: language === 'en' ? '3.2 Acres' : '3.2 એકર',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Mature Trees', 'Bore Well', 'Farm House', 'Market Access']
        : ['પરિપક્વ વૃક્ષો', 'બોર વેલ', 'ફાર્મ હાઉસ', 'માર્કેટ એક્સેસ'],
      views: 312,
      isVerified: true
    },
    {
      id: 4,
      title: language === 'en' ? 'Cotton Field in Rajkot' : 'રાજકોટમાં કપાસનું ખેતર',
      location: language === 'en' ? 'Morbi, Rajkot' : 'મોરબી, રાજકોટ',
      price: '₹6,80,000',
      area: language === 'en' ? '1.5 Acres' : '1.5 એકર',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Black Soil', 'Canal Irrigation', 'Equipment Shed', 'Transport Hub']
        : ['કાળી માટી', 'કેનાલ સિંચાઈ', 'સાધન શેડ', 'ટ્રાન્સપોર્ટ હબ'],
      views: 156,
      isVerified: false
    },
    {
      id: 5,
      title: language === 'en' ? 'Vegetable Farm in Gandhinagar' : 'ગાંધીનગરમાં શાકભાજીનું ફાર્મ',
      location: language === 'en' ? 'Kalol, Gandhinagar' : 'કાલોલ, ગાંધીનગર',
      price: '₹9,95,000',
      area: language === 'en' ? '2.0 Acres' : '2.0 એકર',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Greenhouse', 'Modern Irrigation', 'Cold Storage', 'Highway Access']
        : ['ગ્રીનહાઉસ', 'આધુનિક સિંચાઈ', 'કોલ્ડ સ્ટોરેજ', 'હાઇવે એક્સેસ'],
      views: 203,
      isVerified: true
    },
    {
      id: 6,
      title: language === 'en' ? 'Wheat Field in Bhavnagar' : 'ભાવનગરમાં ઘઉંનું ખેતર',
      location: language === 'en' ? 'Sihor, Bhavnagar' : 'સિહોર, ભાવનગર',
      price: '₹7,45,000',
      area: language === 'en' ? '1.7 Acres' : '1.7 એકર',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: language === 'en' 
        ? ['Tube Well', 'Tractor Shed', 'Boundary Wall', 'Village Road']
        : ['ટ્યુબ વેલ', 'ટ્રેક્ટર શેડ', 'બાઉન્ડ્રી વોલ', 'ગામડાનો રસ્તો'],
      views: 134,
      isVerified: true
    }
  ];

  const handleViewProperty = (propertyId) => {
    navigate(`/property-detail-view?id=${propertyId}`);
  };

  const handleViewAllProperties = () => {
    navigate('/property-listings-search');
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {language === 'en' ? 'Featured Properties' : 'વિશેષ પ્રોપર્ટીઝ'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' ?'Discover handpicked premium agricultural lands with verified documentation and excellent investment potential' :'ચકાસાયેલ દસ્તાવેજીકરણ અને ઉત્તમ રોકાણ સંભાવના સાથે હાથથી પસંદ કરેલી પ્રીમિયમ કૃષિ જમીનો શોધો'
            }
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-card rounded-2xl shadow-elevation-2 overflow-hidden hover:shadow-elevation-3 transition-state group"
            >
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-layout"
                />
                
                {/* Verification Badge */}
                {property.isVerified && (
                  <div className="absolute top-4 left-4 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="CheckCircle" size={14} />
                    <span>{language === 'en' ? 'Verified' : 'ચકાસાયેલ'}</span>
                  </div>
                )}

                {/* Views Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{property.views}</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {property.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {property.area}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {property.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="mr-1 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  onClick={() => handleViewProperty(property.id)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full"
                >
                  {language === 'en' ? 'View Details' : 'વિગતો જુઓ'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleViewAllProperties}
            iconName="Grid3X3"
            iconPosition="left"
            className="px-8"
          >
            {language === 'en' ? 'View All Properties' : 'બધી પ્રોપર્ટીઝ જુઓ'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;