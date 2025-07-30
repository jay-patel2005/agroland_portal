import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsSection = () => {
  const stats = [
    {
      number: '5,000+',
      label: 'Registered Users',
      description: 'Active farmers and land buyers',
      icon: 'Users',
      color: 'text-blue-600'
    },
    {
      number: '2,500+',
      label: 'Successful Transactions',
      description: 'Completed land deals',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      number: '50,000+',
      label: 'Acres Listed',
      description: 'Agricultural land available',
      icon: 'MapPin',
      color: 'text-purple-600'
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Successful matches made',
      icon: 'TrendingUp',
      color: 'text-orange-600'
    },
    {
      number: '25+',
      label: 'Districts Covered',
      description: 'Across Gujarat state',
      icon: 'Globe',
      color: 'text-red-600'
    },
    {
      number: '₹500Cr+',
      label: 'Transaction Value',
      description: 'Total land value facilitated',
      icon: 'DollarSign',
      color: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            Numbers that showcase our commitment to transforming Gujarat's 
            agricultural land marketplace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4">
                  <Icon name={stat.icon} size={32} className={stat.color} />
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Achievement Highlights */}
        <div className="mt-16 lg:mt-24">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 lg:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Recent Achievements
              </h3>
              <p className="text-muted-foreground mb-8">
                Milestones that mark our journey toward becoming Gujarat's leading agricultural platform.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Best AgriTech Platform 2024</h4>
                    <p className="text-sm text-muted-foreground">Gujarat Innovation Awards</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                    <Icon name="Trophy" size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">Top Startup Recognition</h4>
                    <p className="text-sm text-muted-foreground">Gujarat Startup Summit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;