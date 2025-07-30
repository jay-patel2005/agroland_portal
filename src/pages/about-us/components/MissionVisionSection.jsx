import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionVisionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Driving agricultural prosperity through innovative technology and trusted relationships
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Icon name="Target" size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Our Mission</h3>
                  <p className="text-primary font-medium">Empowering Agricultural Growth</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To revolutionize the agricultural land market in Gujarat by providing a transparent, 
                efficient, and user-friendly platform that bridges the gap between land sellers and buyers, 
                enabling fair transactions and sustainable agricultural development.
              </p>

              <div className="space-y-4">
                {[
                  'Facilitate transparent property transactions',
                  'Support rural economic development',
                  'Provide market insights and analytics',
                  'Build trust in agricultural commerce'
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-primary mr-3 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mr-4">
                  <Icon name="Eye" size={32} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Our Vision</h3>
                  <p className="text-secondary font-medium">Leading Agricultural Innovation</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To become Gujarat's most trusted and comprehensive agricultural land marketplace, 
                driving digital transformation in rural real estate while preserving the cultural 
                values and traditional wisdom of our farming communities.
              </p>

              <div className="space-y-4">
                {[
                  'Become Gujarat\'s #1 agri-land platform',
                  'Expand to pan-India agricultural markets',
                  'Integrate AI-powered property matching',
                  'Foster sustainable farming practices'
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Star" size={16} className="text-secondary mr-3 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Our Core Values
              </h3>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Shield',
                  title: 'Trust & Transparency',
                  description: 'Building lasting relationships through honest dealings and clear communication'
                },
                {
                  icon: 'Zap',
                  title: 'Innovation',
                  description: 'Leveraging technology to simplify complex agricultural land transactions'
                },
                {
                  icon: 'Heart',
                  title: 'Community Focus',
                  description: 'Supporting rural communities and promoting sustainable agricultural practices'
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={value.icon} size={32} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;