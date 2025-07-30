import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsWidget = () => {
  const [language, setLanguage] = useState('en');
  const [activeChart, setActiveChart] = useState('search');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Mock analytics data
  const searchPatternsData = [
    { month: language === 'en' ? 'Jan' : 'જાન્યુ', searches: 12 },
    { month: language === 'en' ? 'Feb' : 'ફેબ્રુ', searches: 19 },
    { month: language === 'en' ? 'Mar' : 'માર્ચ', searches: 15 },
    { month: language === 'en' ? 'Apr' : 'એપ્રિલ', searches: 25 },
    { month: language === 'en' ? 'May' : 'મે', searches: 22 },
    { month: language === 'en' ? 'Jun' : 'જૂન', searches: 30 }
  ];

  const priceRangeData = [
    { range: '₹10L-25L', count: 45, color: '#2563EB' },
    { range: '₹25L-50L', count: 32, color: '#059669' },
    { range: '₹50L-1Cr', count: 18, color: '#F59E0B' },
    { range: '₹1Cr+', count: 5, color: '#DC2626' }
  ];

  const marketTrendsData = [
    { month: language === 'en' ? 'Jan' : 'જાન્યુ', avgPrice: 2500000 },
    { month: language === 'en' ? 'Feb' : 'ફેબ્રુ', avgPrice: 2650000 },
    { month: language === 'en' ? 'Mar' : 'માર્ચ', avgPrice: 2580000 },
    { month: language === 'en' ? 'Apr' : 'એપ્રિલ', avgPrice: 2720000 },
    { month: language === 'en' ? 'May' : 'મે', avgPrice: 2800000 },
    { month: language === 'en' ? 'Jun' : 'જૂન', avgPrice: 2750000 }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(price);
  };

  const chartTabs = [
    {
      id: 'search',
      label: language === 'en' ? 'Search Patterns' : 'શોધ પેટર્ન',
      icon: 'TrendingUp'
    },
    {
      id: 'price',
      label: language === 'en' ? 'Price Range' : 'કિંમત રેન્જ',
      icon: 'PieChart'
    },
    {
      id: 'market',
      label: language === 'en' ? 'Market Trends' : 'બજાર ટ્રેન્ડ',
      icon: 'BarChart3'
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'search':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={searchPatternsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="searches" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'price':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={priceRangeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {priceRangeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'market':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={marketTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatPrice(value), language === 'en' ? 'Avg Price' : 'સરેરાશ કિંમત']}
              />
              <Line 
                type="monotone" 
                dataKey="avgPrice" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'en' ? 'Analytics' : 'વિશ્લેષણ'}
        </h3>
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-micro flex items-center space-x-1
                ${activeChart === tab.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        {renderChart()}
      </div>

      {/* Legend for Price Range Chart */}
      {activeChart === 'price' && (
        <div className="grid grid-cols-2 gap-2">
          {priceRangeData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.range} ({item.count})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">
          {language === 'en' ? 'Key Insights' : 'મુખ્ય આંતરદૃષ્ટિ'}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-muted-foreground">
              {language === 'en' ?'Your search activity increased by 25% this month' :'આ મહિને તમારી શોધ પ્રવૃત્તિ 25% વધી છે'
              }
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Target" size={14} className="text-primary" />
            <span className="text-muted-foreground">
              {language === 'en' ?'Most searched price range: ₹10L-25L' :'સૌથી વધુ શોધાયેલ કિંમત રેન્જ: ₹10L-25L'
              }
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MapPin" size={14} className="text-warning" />
            <span className="text-muted-foreground">
              {language === 'en' ?'Top location: Ahmedabad District' :'ટોચનું સ્થાન: અમદાવાદ જિલ્લો'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;