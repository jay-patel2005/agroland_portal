import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../home-landing-page/components/Footer';
import HeroSection from './components/HeroSection';
import MissionVisionSection from './components/MissionVisionSection';
import CompanyStorySection from './components/CompanyStorySection';
import TeamSection from './components/TeamSection';
import ValuesSection from './components/ValuesSection';
import StatisticsSection from './components/StatisticsSection';
import CallToActionSection from './components/CallToActionSection';

const AboutUsPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'About Us - AgroLand Portal';
    
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
        
        {/* Mission & Vision */}
        <MissionVisionSection />
        
        {/* Company Story */}
        <CompanyStorySection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Values Section */}
        <ValuesSection />
        
        {/* Statistics */}
        <StatisticsSection />
        
        {/* Call to Action */}
        <CallToActionSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;