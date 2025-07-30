import React from 'react';
import Icon from '../../../components/AppIcon';

const CompanyStorySection = () => {
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'AgroLand Portal was founded with a vision to revolutionize agricultural property transactions in Gujarat. Starting with a small team of passionate developers and agricultural experts.',
      icon: 'Sprout',
      color: 'bg-primary'
    },
    {
      year: '2021',
      title: 'Platform Launch',
      description: 'After months of development and testing, we launched our digital platform connecting buyers and sellers of agricultural land across Gujarat with transparent pricing and verified listings.',
      icon: 'Rocket',
      color: 'bg-success'
    },
    {
      year: '2022',
      title: 'Rapid Growth',
      description: 'Expanded to cover over 200+ villages across Gujarat, facilitated 1000+ property transactions, and built a community of 5000+ registered users including farmers, investors, and developers.',
      icon: 'TrendingUp',
      color: 'bg-warning'
    },
    {
      year: '2023',
      title: 'Advanced Features',
      description: 'Introduced AI-powered property valuation, drone surveys for accurate land assessment, legal verification services, and mobile app for on-the-go property management.',
      icon: 'Zap',
      color: 'bg-indigo-500'
    },
    {
      year: '2024',
      title: 'Market Leadership',
      description: 'Became Gujarat\'s leading digital platform for agricultural real estate with 10,000+ active listings, partnerships with major banks for financing, and recognition from the state government.',
      icon: 'Crown',
      color: 'bg-yellow-500'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Expanding to neighboring states, implementing blockchain for transparent transactions, launching farmer education programs, and building an ecosystem for sustainable agriculture.',
      icon: 'Eye',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a simple idea to transform agricultural real estate in Gujarat, we have grown into a trusted platform serving thousands of farmers, investors, and property seekers.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className={`flex-1 ${
                  index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                }`}>
                  <div className="bg-card rounded-lg border border-border p-6 lg:p-8 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${milestone.color} text-white p-2 rounded-lg`}>
                        <Icon name={milestone.icon} size={24} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-elevation-1"></div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Ready to be Part of Our Story?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have successfully bought, sold, or invested in agricultural properties through AgroLand Portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                <Icon name="UserPlus" size={20} />
                Join Our Community
              </button>
              <button className="border border-border hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                <Icon name="MessageCircle" size={20} />
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStorySection;