import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Get In Touch
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            We're Here to
            <span className="text-primary block">Help You Succeed</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about agricultural land transactions? Need assistance with property listings? 
            Our expert team is ready to provide personalized support for all your real estate needs.
          </p>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">Response Time</div>
              <div className="text-xs text-muted-foreground">Within 24 hours</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">Expert Support</div>
              <div className="text-xs text-muted-foreground">Dedicated team</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Icon name="MapPin" size={24} className="text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">Local Presence</div>
              <div className="text-xs text-muted-foreground">Gujarat-based</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              <Icon name="Phone" size={20} className="mr-2" />
              Call Us Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Icon name="Mail" size={20} className="mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
    </section>
  );
};

export default HeroSection;