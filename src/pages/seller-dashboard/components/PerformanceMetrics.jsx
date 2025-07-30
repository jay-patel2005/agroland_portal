import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PerformanceMetrics = ({ language }) => {
  const topPerformingProperties = [
    {
      id: 1,
      title: language === 'en' ? 'Premium Agricultural Plot' : 'પ્રીમિયમ કૃષિ પ્લોટ',
      location: language === 'en' ? 'Vadodara, Gujarat' : 'વડોદરા, ગુજરાત',
      image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 456,
      inquiries: 23,
      viewsGrowth: '+18%',
      inquiriesGrowth: '+12%',
      price: '₹15,25,000',
      area: '7 Acres'
    },
    {
      id: 2,
      title: language === 'en' ? 'Agricultural Land in Mehsana' : 'મહેસાણામાં કૃષિ જમીન',
      location: language === 'en' ? 'Mehsana, Gujarat' : 'મહેસાણા, ગુજરાત',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 234,
      inquiries: 12,
      viewsGrowth: '+8%',
      inquiriesGrowth: '+5%',
      price: '₹12,50,000',
      area: '5 Acres'
    },
    {
      id: 3,
      title: language === 'en' ? 'Fertile Farm Land in Anand' : 'આનંદમાં ફળદ્રુપ ખેતીની જમીન',
      location: language === 'en' ? 'Anand, Gujarat' : 'આનંદ, ગુજરાત',
      image: 'https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg',
      views: 189,
      inquiries: 8,
      viewsGrowth: '+15%',
      inquiriesGrowth: '+3%',
      price: '₹8,75,000',
      area: '3.5 Acres'
    }
  ];

  const engagementMetrics = [
    {
      id: 1,
      label: language === 'en' ? 'Average Views per Property' : 'પ્રોપર્ટી દીઠ સરેરાશ વ્યૂઝ',
      value: '187',
      change: '+12%',
      changeType: 'positive',
      icon: 'Eye'
    },
    {
      id: 2,
      label: language === 'en' ? 'Inquiry Conversion Rate' : 'પૂછપરછ કન્વર્ઝન રેટ',
      value: '8.4%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Target'
    },
    {
      id: 3,
      label: language === 'en' ? 'Response Time' : 'રિસ્પોન્સ ટાઇમ',
      value: '2.3h',
      change: '-0.5h',
      changeType: 'positive',
      icon: 'Clock'
    },
    {
      id: 4,
      label: language === 'en' ? 'Profile Views' : 'પ્રોફાઇલ વ્યૂઝ',
      value: '1,234',
      change: '+24%',
      changeType: 'positive',
      icon: 'User'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Performing Properties */}
      <div className="bg-card rounded-lg border border-border shadow-elevation-1">
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Top Performing Properties' : 'ટોપ પરફોર્મિંગ પ્રોપર્ટીઝ'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' ? 'Properties with highest engagement' : 'સૌથી વધુ એન્ગેજમેન્ટ વાળી પ્રોપર્ટીઝ'}
              </p>
            </div>
            <Icon name="Award" size={20} className="text-warning" />
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <div className="space-y-4">
            {topPerformingProperties.map((property, index) => (
              <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>

                {/* Property Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{property.title}</h4>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-semibold text-foreground">{property.price}</span>
                    <span className="text-sm text-muted-foreground">{property.area}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Icon name="Eye" size={14} />
                      <span>{property.views}</span>
                    </div>
                    <span className="text-xs text-success">{property.viewsGrowth}</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Icon name="MessageSquare" size={14} />
                      <span>{property.inquiries}</span>
                    </div>
                    <span className="text-xs text-success">{property.inquiriesGrowth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-card rounded-lg border border-border shadow-elevation-1">
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Engagement Metrics' : 'એન્ગેજમેન્ટ મેટ્રિક્સ'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'en' ? 'Track your overall performance' : 'તમારી એકંદર કામગીરી ટ્રેક કરો'}
              </p>
            </div>
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engagementMetrics.map((metric) => (
              <div key={metric.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={metric.icon} size={20} className="text-primary" />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;