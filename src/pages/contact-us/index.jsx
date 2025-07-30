import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../home-landing-page/components/Footer';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import MapSection from './components/MapSection';
import FAQSection from './components/FAQSection';
import QuickContactSection from './components/QuickContactSection';

const ContactUsPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Contact Us - AgroLand Portal';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Contact Form & Info */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <MapSection />
        
        {/* Quick Contact */}
        <QuickContactSection />
        
        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUsPage;