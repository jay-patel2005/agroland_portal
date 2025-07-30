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
            <Icon name="Users" size={16} className="mr-2" />
            About AgroLand Portal
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            Connecting Gujarat's
            <span className="text-primary block">Agricultural Community</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to transforming the agricultural land market in Gujarat by providing 
            a transparent, efficient, and trustworthy platform that connects farmers, landowners, 
            and agricultural investors.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              <Icon name="Users" size={20} className="mr-2" />
              Meet Our Team
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Our Mission
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