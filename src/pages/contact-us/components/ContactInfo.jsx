import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'Phone',
      title: 'Phone Number',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Available Mon-Sat, 9 AM - 7 PM'
    },
    {
      icon: 'Mail',
      title: 'Email Address',
      details: ['support@agrolandportal.com', 'info@agrolandportal.com'],
      description: 'We reply within 24 hours'
    },
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: ['123 Agricultural Plaza', 'Sector 5, Gandhinagar', 'Gujarat 382005, India'],
      description: 'Visit us during business hours'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 10:00 AM - 5:00 PM', 'Sunday: Closed'],
      description: 'Emergency support available 24/7'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#', color: 'text-blue-600' },
    { name: 'Twitter', icon: 'Twitter', url: '#', color: 'text-blue-400' },
    { name: 'Instagram', icon: 'Instagram', url: '#', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#', color: 'text-blue-700' }
  ];

  const quickActions = [
    {
      title: 'Schedule a Call',
      description: 'Book a consultation with our property experts',
      icon: 'Calendar',
      action: () => console.log('Schedule call')
    },
    {
      title: 'Live Chat',
      description: 'Start chatting with our support team',
      icon: 'MessageCircle',
      action: () => console.log('Start chat')
    },
    {
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick support',
      icon: 'MessageSquare',
      action: () => window.open('https://wa.me/919876543210', '_blank')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            We're here to help you with all your agricultural land needs.
          </p>
        </div>

        <div className="space-y-6">
          {contactDetails.map((contact, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={contact.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1">
                  {contact.title}
                </h4>
                <div className="space-y-1">
                  {contact.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-sm text-foreground">
                      {contact.icon === 'Phone' ? (
                        <a href={`tel:${detail.replace(/\s/g, '')}`} className="hover:text-primary">
                          {detail}
                        </a>
                      ) : contact.icon === 'Mail' ? (
                        <a href={`mailto:${detail}`} className="hover:text-primary">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {contact.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Quick Actions
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose the best way to reach us
          </p>
        </div>

        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={action.icon} size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm">
                  {action.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Follow Us
          </h3>
          <p className="text-sm text-muted-foreground">
            Stay updated with our latest news and updates
          </p>
        </div>

        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className={`w-10 h-10 rounded-lg border border-border hover:border-primary/20 flex items-center justify-center transition-colors ${social.color} hover:bg-primary/5`}
              aria-label={social.name}
            >
              <Icon name={social.icon} size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              Emergency Support
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              For urgent matters or technical emergencies, contact our 24/7 helpline.
            </p>
            <Button variant="outline" size="sm">
              <Icon name="Phone" size={16} className="mr-2" />
              Emergency Hotline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;