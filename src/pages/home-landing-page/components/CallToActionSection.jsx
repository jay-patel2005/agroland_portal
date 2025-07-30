import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToActionSection = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleGetStarted = (role) => {
    // Store the intended role for registration
    localStorage.setItem('intendedRole', role);
    navigate('/authentication-login-register');
  };

  const handleBrowseProperties = () => {
    navigate('/property-listings-search');
  };

  const userTypes = [
    {
      type: 'buyer',
      icon: 'ShoppingCart',
      title: language === 'en' ? 'For Buyers' : 'ખરીદદારો માટે',
      description: language === 'en' ?'Find your perfect agricultural land with advanced search filters and verified listings' :'અદ્યતન શોધ ફિલ્ટર્સ અને ચકાસાયેલ લિસ્ટિંગ્સ સાથે તમારી સંપૂર્ણ કૃષિ જમીન શોધો',
      benefits: language === 'en' 
        ? ['Advanced Property Search', 'Verified Listings', 'Direct Seller Contact', 'Legal Documentation Support']
        : ['અદ્યતન પ્રોપર્ટી શોધ', 'ચકાસાયેલ લિસ્ટિંગ્સ', 'સીધો વેચનાર સંપર્ક', 'કાનૂની દસ્તાવેજીકરણ સહાય'],
      buttonText: language === 'en' ? 'Start Buying' : 'ખરીદવાનું શરૂ કરો',
      color: 'bg-primary'
    },
    {
      type: 'seller',
      icon: 'Store',
      title: language === 'en' ? 'For Sellers' : 'વેચનારા માટે',
      description: language === 'en' ?'List your agricultural property and connect with verified buyers across Gujarat' :'તમારી કૃષિ મિલકત સૂચિબદ્ધ કરો અને ગુજરાતભરના ચકાસાયેલ ખરીદદારો સાથે જોડાઓ',
      benefits: language === 'en' 
        ? ['Easy Property Listing', 'Verified Buyer Network', 'Analytics Dashboard', 'Marketing Support']
        : ['સરળ પ્રોપર્ટી લિસ્ટિંગ', 'ચકાસાયેલ ખરીદદાર નેટવર્ક', 'એનાલિટિક્સ ડેશબોર્ડ', 'માર્કેટિંગ સહાય'],
      buttonText: language === 'en' ? 'Start Selling' : 'વેચવાનું શરૂ કરો',
      color: 'bg-secondary'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            {language === 'en' ? 'Ready to Get Started?' : 'શરૂ કરવા તૈયાર છો?'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {language === 'en' ?'Join thousands of satisfied users who have successfully bought and sold agricultural properties through our platform' :'હજારો સંતુષ્ટ વપરાશકર્તાઓ સાથે જોડાઓ જેમણે અમારા પ્લેટફોર્મ દ્વારા સફળતાપૂર્વક કૃષિ મિલકતો ખરીદી અને વેચી છે'
            }
          </p>
          
          {/* Quick Browse Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={handleBrowseProperties}
            iconName="Search"
            iconPosition="left"
            className="mb-12"
          >
            {language === 'en' ? 'Browse Properties First' : 'પહેલા પ્રોપર્ટીઝ બ્રાઉઝ કરો'}
          </Button>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {userTypes.map((userType) => (
            <div
              key={userType.type}
              className="bg-card rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-state group"
            >
              {/* Icon and Title */}
              <div className="flex items-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${userType.color} text-white mr-4 group-hover:scale-110 transition-micro`}>
                  <Icon name={userType.icon} size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    {userType.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {userType.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                {userType.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-foreground">
                    <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="default"
                size="lg"
                onClick={() => handleGetStarted(userType.type)}
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full"
              >
                {userType.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-card rounded-2xl p-8 shadow-elevation-2 text-center">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
            {language === 'en' ? 'Why Choose AgroLand Portal?' : 'શા માટે AgroLand Portal પસંદ કરો?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                <Icon name="Shield" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                {language === 'en' ? 'Secure & Verified' : 'સુરક્ષિત અને ચકાસાયેલ'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ?'All properties and users are thoroughly verified for your safety' :'તમારી સુરક્ષા માટે બધી પ્રોપર્ટીઝ અને વપરાશકર્તાઓ સંપૂર્ણ રીતે ચકાસાયેલ છે'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 text-success rounded-lg mb-4">
                <Icon name="Zap" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                {language === 'en' ? 'Fast & Easy' : 'ઝડપી અને સરળ'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ?'Simple registration process and intuitive platform design' :'સરળ નોંધણી પ્રક્રિયા અને સાહજિક પ્લેટફોર્મ ડિઝાઇન'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-lg mb-4">
                <Icon name="HeadphonesIcon" size={24} />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                {language === 'en' ? '24/7 Support' : '24/7 સહાય'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ?'Round-the-clock customer support in English and Gujarati' :'અંગ્રેજી અને ગુજરાતીમાં 24 કલાક ગ્રાહક સહાય'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;