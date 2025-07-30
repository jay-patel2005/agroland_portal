import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToActionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking to list your land or a buyer searching 
            for the perfect agricultural property, we're here to help you succeed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* For Sellers */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                For Land Sellers
              </h3>
              <p className="text-muted-foreground mb-6">
                List your agricultural land and connect with verified buyers across Gujarat.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                  <span>Free listing for first 30 days</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                  <span>Verified buyer inquiries</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                  <span>Professional support</span>
                </li>
              </ul>
              <Link to="/authentication-login-register?mode=register&role=seller">
                <Button variant="default" className="w-full">
                  Start Selling
                </Button>
              </Link>
            </div>
            
            {/* For Buyers */}
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-lg mx-auto mb-4">
                <Icon name="Search" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                For Land Buyers
              </h3>
              <p className="text-muted-foreground mb-6">
                Find the perfect agricultural land for your farming needs in Gujarat.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-secondary" />
                  <span>Advanced search filters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-secondary" />
                  <span>Detailed property information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-secondary" />
                  <span>Direct seller contact</span>
                </li>
              </ul>
              <Link to="/authentication-login-register?mode=register&role=buyer">
                <Button variant="outline" className="w-full">
                  Start Buying
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="MessageCircle" size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Have Questions?
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you get started. Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us">
                <Button variant="outline" iconName="Mail" iconPosition="left">
                  Contact Us
                </Button>
              </Link>
              <Button variant="ghost" iconName="Phone" iconPosition="left">
                +91 98765 43210
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;