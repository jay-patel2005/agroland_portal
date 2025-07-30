import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SellerContact = ({ seller, propertyId }) => {
  const [language, setLanguage] = useState('en');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert(language === 'en' ?'Your inquiry has been sent to the seller!' :'તમારી પૂછપરછ વેચનારને મોકલવામાં આવી છે!'
    );
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowContactForm(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${seller.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'en' ? `Hi, I'm interested in your property listing (ID: ${propertyId}). Can you provide more details?`
        : `નમસ્તે, મને તમારી પ્રોપર્ટી લિસ્ટિંગ (ID: ${propertyId}) માં રસ છે. શું તમે વધુ વિગતો આપી શકો?`
    );
    window.open(`https://wa.me/91${seller.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2">
      {/* Seller Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
          <Image
            src={seller.avatar}
            alt={seller.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {seller.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Icon name="Star" size={14} className="text-warning mr-1" />
            <span>{seller.rating} ({seller.reviewCount} {language === 'en' ? 'reviews' : 'સમીક્ષાઓ'})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{seller.location}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-success font-medium">
            {language === 'en' ? 'Verified' : 'ચકાસાયેલ'}
          </span>
        </div>
      </div>

      {/* Seller Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller.totalListings}</div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Listings' : 'લિસ્ટિંગ્સ'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller.soldProperties}</div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Sold' : 'વેચાયેલ'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller.yearsExperience}</div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Years' : 'વર્ષ'}
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="space-y-3 mb-6">
        <Button
          variant="default"
          onClick={handleCall}
          iconName="Phone"
          iconPosition="left"
          className="w-full"
        >
          {language === 'en' ? 'Call Now' : 'હવે કૉલ કરો'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleWhatsApp}
          iconName="MessageCircle"
          iconPosition="left"
          className="w-full"
        >
          {language === 'en' ? 'WhatsApp' : 'વ્હોટ્સએપ'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => setShowContactForm(!showContactForm)}
          iconName="Mail"
          iconPosition="left"
          className="w-full"
        >
          {language === 'en' ? 'Send Inquiry' : 'પૂછપરછ મોકલો'}
        </Button>
      </div>

      {/* Contact Form */}
      {showContactForm && (
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-4">
            {language === 'en' ? 'Send Message' : 'સંદેશ મોકલો'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={language === 'en' ? 'Your Name' : 'તમારું નામ'}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter your name' : 'તમારું નામ દાખલ કરો'}
              required
            />
            
            <Input
              label={language === 'en' ? 'Email Address' : 'ઈમેઈલ સરનામું'}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter your email' : 'તમારું ઈમેઈલ દાખલ કરો'}
              required
            />
            
            <Input
              label={language === 'en' ? 'Phone Number' : 'ફોન નંબર'}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter your phone' : 'તમારો ફોન દાખલ કરો'}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Message' : 'સંદેશ'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={language === 'en' ?'I am interested in this property...' :'મને આ પ્રોપર્ટીમાં રસ છે...'
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="default"
                className="flex-1"
              >
                {language === 'en' ? 'Send Message' : 'સંદેશ મોકલો'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowContactForm(false)}
                className="flex-1"
              >
                {language === 'en' ? 'Cancel' : 'રદ કરો'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Contact Info */}
      <div className="border-t border-border pt-4">
        <div className="text-xs text-muted-foreground text-center">
          {language === 'en' ?'Response time: Usually within 2 hours' :'પ્રતિસાદ સમય: સામાન્ય રીતે 2 કલાકમાં'
          }
        </div>
      </div>
    </div>
  );
};

export default SellerContact;