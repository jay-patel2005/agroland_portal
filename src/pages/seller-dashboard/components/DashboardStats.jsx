import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ language }) => {
  const statsData = [
    {
      id: 1,
      title: language === 'en' ? 'Total Properties' : 'કુલ પ્રોપર્ટીઝ',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'Building2',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: language === 'en' ? 'Active Listings' : 'સક્રિય લિસ્ટિંગ્સ',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: language === 'en' ? 'Pending Approval' : 'મંજૂરી બાકી',
      value: '6',
      change: '-3%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      title: language === 'en' ? 'Total Views' : 'કુલ વ્યૂઝ',
      value: '1,247',
      change: '+24%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      title: language === 'en' ? 'Inquiries' : 'પૂછપરછ',
      value: '89',
      change: '+15%',
      changeType: 'positive',
      icon: 'MessageSquare',
      color: 'bg-indigo-500'
    },
    {
      id: 6,
      title: language === 'en' ? 'Revenue' : 'આવક',
      value: '₹2,45,000',
      change: '+18%',
      changeType: 'positive',
      icon: 'IndianRupee',
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="bg-card rounded-lg border border-border p-4 lg:p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-state"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <Icon
                  name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'}
                  size={16}
                  className={`mr-1 ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  {language === 'en' ? 'vs last month' : 'છેલ્લા મહિને'}
                </span>
              </div>
            </div>
            <div className={`${stat.color} rounded-lg p-3 ml-4`}>
              <Icon name={stat.icon} size={24} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;