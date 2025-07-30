import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Rajesh Patel',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      bio: 'Agricultural technology expert with 15+ years in Gujarat\'s farming sector.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Priya Shah',
      role: 'Co-Founder & CTO',
      image: '/api/placeholder/300/300',
      bio: 'Software engineer passionate about using technology to solve agricultural challenges.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Kiran Modi',
      role: 'Head of Operations',
      image: '/api/placeholder/300/300',
      bio: 'Operations specialist with deep understanding of land transaction processes.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Ankit Desai',
      role: 'Head of Marketing',
      image: '/api/placeholder/300/300',
      bio: 'Marketing professional focused on building agricultural community connections.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Passionate professionals dedicated to transforming Gujarat's agricultural 
            land marketplace through innovation and community focus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-secondary/10 flex items-center justify-center">
                  <Icon name="User" size={48} className="text-secondary" />
                </div>
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-background/95 rounded-full p-4 flex space-x-2">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Icon name="Linkedin" size={14} className="text-primary" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Icon name="Twitter" size={14} className="text-primary" />
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-4">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
        
        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-primary">
            <Icon name="Users" size={20} />
            <span className="text-sm font-medium">Want to join our team?</span>
          </div>
          <p className="text-muted-foreground mt-2">
            We're always looking for passionate individuals to help us grow Gujarat's agricultural community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;