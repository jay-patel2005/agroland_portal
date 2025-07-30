import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedProperties from './components/FeaturedProperties';
import StatisticsSection from './components/StatisticsSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const HomeLandingPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'AgroLand Portal - Find Your Perfect Agricultural Land';
    
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
        
        {/* Featured Properties */}
        <FeaturedProperties />
        
        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Trust Signals */}
        <TrustSignalsSection />
        
        {/* Call to Action */}
        <CallToActionSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLandingPage;