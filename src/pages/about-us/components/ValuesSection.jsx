import React from 'react';
import Icon from '../../../components/AppIcon';

const ValuesSection = () => {
  const values = [
    {
      title: 'Transparency',
      description: 'We believe in open, honest communication and clear processes in all land transactions.',
      icon: 'Eye',
      color: 'text-blue-600'
    },
    {
      title: 'Trust',
      description: 'Building lasting relationships through reliable service and verified property listings.',
      icon: 'Shield',
      color: 'text-green-600'
    },
    {
      title: 'Community',
      description: 'Supporting Gujarat\'s agricultural communities and fostering connections between farmers.',
      icon: 'Users',
      color: 'text-purple-600'
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user feedback.',
      icon: 'Lightbulb',
      color: 'text-yellow-600'
    },
    {
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards in all our business practices and interactions.',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our service and platform experience.',
      icon: 'Star',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground">
            The core principles that guide everything we do and shape our commitment 
            to Gujarat's agricultural community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <Icon name={value.icon} size={24} className={`${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Values in Action */}
        <div className="mt-16 lg:mt-24">
          <div className="bg-card rounded-lg p-8 lg:p-12 border border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Values in Action
              </h3>
              <p className="text-muted-foreground">
                See how our values translate into real impact for Gujarat's agricultural community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Verified Listings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;