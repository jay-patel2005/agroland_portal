import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const [language, setLanguage] = useState('en');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Mock activity data
    const mockActivities = [
      {
        id: 1,
        type: 'property_viewed',
        title: 'Premium Agricultural Land in Sanand',
        description: 'You viewed this property',
        image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg',
        timestamp: '2 hours ago',
        icon: 'Eye',
        color: 'text-blue-500'
      },
      {
        id: 2,
        type: 'price_drop',
        title: 'Residential Plot in Dholka',
        description: 'Price reduced by ₹2,00,000',
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        timestamp: '5 hours ago',
        icon: 'TrendingDown',
        color: 'text-green-500'
      },
      {
        id: 3,
        type: 'new_listing',
        title: 'Commercial Land in Bavla',
        description: 'New property matching your search criteria',
        image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
        timestamp: '1 day ago',
        icon: 'Plus',
        color: 'text-primary'
      },
      {
        id: 4,
        type: 'inquiry_response',
        title: 'Industrial Plot in Changodar',
        description: 'Seller responded to your inquiry',
        image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
        timestamp: '2 days ago',
        icon: 'MessageSquare',
        color: 'text-success'
      },
      {
        id: 5,
        type: 'property_saved',
        title: 'Agricultural Land in Viramgam',
        description: 'You saved this property',
        image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg',
        timestamp: '3 days ago',
        icon: 'Heart',
        color: 'text-destructive'
      }
    ];

    setActivities(mockActivities);
  }, []);

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'property_viewed':
        return language === 'en' ? 'You viewed this property' : 'તમે આ પ્રોપર્ટી જોઈ';
      case 'price_drop':
        return language === 'en' ? activity.description : 'કિંમતમાં ઘટાડો';
      case 'new_listing':
        return language === 'en' ? 'New property matching your search' : 'તમારી શોધ સાથે મેળ ખાતી નવી પ્રોપર્ટી';
      case 'inquiry_response':
        return language === 'en' ? 'Seller responded to your inquiry' : 'વેચનારે તમારી પૂછપરછનો જવાબ આપ્યો';
      case 'property_saved':
        return language === 'en' ? 'You saved this property' : 'તમે આ પ્રોપર્ટી સાચવી';
      default:
        return activity.description;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'en' ? 'Recent Activity' : 'તાજેતરની પ્રવૃત્તિ'}
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-micro">
          {language === 'en' ? 'View All' : 'બધું જુઓ'}
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {language === 'en' ? 'No recent activity' : 'કોઈ તાજેતરની પ્રવૃત્તિ નથી'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-micro">
              {/* Icon */}
              <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                <Icon name={activity.icon} size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground line-clamp-1">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getActivityText(activity)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden ml-3 flex-shrink-0">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;