import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const Footer = () => {
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    company: {
      title: language === 'en' ? 'Company' : 'કંપની',
      links: [
        { label: language === 'en' ? 'About Us' : 'અમારા વિશે', path: '/about' },
        { label: language === 'en' ? 'Our Team' : 'અમારી ટીમ', path: '/about#team' },
        { label: language === 'en' ? 'Careers' : 'કારકિર્દી', path: '/careers' },
        { label: language === 'en' ? 'Press' : 'પ્રેસ', path: '/press' }
      ]
    },
    services: {
      title: language === 'en' ? 'Services' : 'સેવાઓ',
      links: [
        { label: language === 'en' ? 'Buy Property' : 'પ્રોપર્ટી ખરીદો', path: '/property-listings-search' },
        { label: language === 'en' ? 'Sell Property' : 'પ્રોપર્ટી વેચો', path: '/seller-dashboard' },
        { label: language === 'en' ? 'Property Valuation' : 'પ્રોપર્ટી મૂલ્યાંકન', path: '/valuation' },
        { label: language === 'en' ? 'Legal Support' : 'કાનૂની સહાય', path: '/legal-support' }
      ]
    },
    support: {
      title: language === 'en' ? 'Support' : 'સહાય',
      links: [
        { label: language === 'en' ? 'Help Center' : 'સહાય કેન્દ્ર', path: '/help' },
        { label: language === 'en' ? 'Contact Us' : 'અમારો સંપર્ક કરો', path: '/contact' },
        { label: language === 'en' ? 'FAQ' : 'FAQ', path: '/faq' },
        { label: language === 'en' ? 'Live Chat' : 'લાઇવ ચેટ', path: '/chat' }
      ]
    },
    legal: {
      title: language === 'en' ? 'Legal' : 'કાનૂની',
      links: [
        { label: language === 'en' ? 'Privacy Policy' : 'ગોપનીયતા નીતિ', path: '/privacy' },
        { label: language === 'en' ? 'Terms of Service' : 'સેવાની શરતો', path: '/terms' },
        { label: language === 'en' ? 'Cookie Policy' : 'કુકી નીતિ', path: '/cookies' },
        { label: language === 'en' ? 'Disclaimer' : 'અસ્વીકરણ', path: '/disclaimer' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/agrolandportal' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/agrolandportal' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/agrolandportal' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/agrolandportal' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/agrolandportal' }
  ];

  const contactInfo = {
    address: language === 'en' ?'AgroLand Portal Pvt. Ltd.\nB-201, Business Hub,\nS.G. Highway, Ahmedabad - 380015\nGujarat, India' :'AgroLand Portal Pvt. Ltd.\nB-201, બિઝનેસ હબ,\nS.G. હાઇવે, અમદાવાદ - 380015\nગુજરાત, ભારત',
    phone: '+91 79 4000 5000',
    email: 'info@agrolandportal.com',
    hours: language === 'en' ?'Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed' :'સોમવાર - શનિવાર: સવારે 9:00 - સાંજે 6:00\nરવિવાર: બંધ'
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              {language === 'en' ? 'Stay Updated with Latest Properties' : 'નવીનતમ પ્રોપર્ટીઝ સાથે અપડેટ રહો'}
            </h3>
            <p className="text-background/80 mb-8 max-w-2xl mx-auto">
              {language === 'en' ?'Subscribe to our newsletter and get notified about new agricultural properties, market trends, and exclusive deals' :'અમારા ન્યૂઝલેટરને સબ્સ્ક્રાઇબ કરો અને નવી કૃષિ મિલકતો, બજારના વલણો અને વિશેષ સોદાઓ વિશે સૂચના મેળવો'
              }
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'en' ? 'Enter your email address' : 'તમારું ઇમેઇલ સરનામું દાખલ કરો'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background/10 border-background/30 text-background placeholder:text-background/60"
              />
              <Button
                type="submit"
                variant="secondary"
                iconName="Send"
                iconPosition="right"
                disabled={isSubscribed}
              >
                {isSubscribed 
                  ? (language === 'en' ? 'Subscribed!' : 'સબ્સ્ક્રાઇબ થયું!')
                  : (language === 'en' ? 'Subscribe' : 'સબ્સ્ક્રાઇબ કરો')
                }
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/home-landing-page" className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.38-1.01C17.69 25.46 22 20.55 22 15V7l-10-5z"/>
                  <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-heading font-bold">AgroLand</span>
                <span className="text-sm font-caption ml-1">Portal</span>
              </div>
            </Link>

            <p className="text-background/80 mb-6 leading-relaxed">
              {language === 'en' ?'Gujarat\'s premier agricultural land marketplace connecting verified buyers and sellers with secure, transparent transactions and comprehensive property management solutions.'
                : 'ગુજરાતનું પ્રીમિયર કૃષિ જમીન માર્કેટપ્લેસ જે ચકાસાયેલ ખરીદદારો અને વેચનારાઓને સુરક્ષિત, પારદર્શક વ્યવહારો અને વ્યાપક પ્રોપર્ટી મેનેજમેન્ટ સોલ્યુશન્સ સાથે જોડે છે.'
              }
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-micro"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-heading font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-background/80 hover:text-background transition-micro text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center">
                <Icon name="MapPin" size={18} className="mr-2" />
                {language === 'en' ? 'Address' : 'સરનામું'}
              </h4>
              <p className="text-background/80 text-sm whitespace-pre-line">
                {contactInfo.address}
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center">
                <Icon name="Phone" size={18} className="mr-2" />
                {language === 'en' ? 'Phone' : 'ફોન'}
              </h4>
              <p className="text-background/80 text-sm">{contactInfo.phone}</p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center">
                <Icon name="Mail" size={18} className="mr-2" />
                {language === 'en' ? 'Email' : 'ઇમેઇલ'}
              </h4>
              <p className="text-background/80 text-sm">{contactInfo.email}</p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center">
                <Icon name="Clock" size={18} className="mr-2" />
                {language === 'en' ? 'Hours' : 'સમય'}
              </h4>
              <p className="text-background/80 text-sm whitespace-pre-line">
                {contactInfo.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/80 text-sm">
              © {new Date().getFullYear()} AgroLand Portal. {language === 'en' ? 'All rights reserved.' : 'બધા અધિકારો આરક્ષિત.'}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-background/80 hover:text-background transition-micro">
                {language === 'en' ? 'Privacy' : 'ગોપનીયતા'}
              </Link>
              <Link to="/terms" className="text-background/80 hover:text-background transition-micro">
                {language === 'en' ? 'Terms' : 'શરતો'}
              </Link>
              <Link to="/cookies" className="text-background/80 hover:text-background transition-micro">
                {language === 'en' ? 'Cookies' : 'કુકીઝ'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;