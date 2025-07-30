import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsChart = ({ language }) => {
  const [activeTab, setActiveTab] = useState('views');

  const viewsData = [
    { month: language === 'en' ? 'Jan' : 'જાન્યુ', views: 1200, inquiries: 45 },
    { month: language === 'en' ? 'Feb' : 'ફેબ્રુ', views: 1800, inquiries: 67 },
    { month: language === 'en' ? 'Mar' : 'માર્ચ', views: 1400, inquiries: 52 },
    { month: language === 'en' ? 'Apr' : 'એપ્રિલ', views: 2200, inquiries: 89 },
    { month: language === 'en' ? 'May' : 'મે', views: 1900, inquiries: 73 },
    { month: language === 'en' ? 'Jun' : 'જૂન', views: 2400, inquiries: 95 },
    { month: language === 'en' ? 'Jul' : 'જુલાઈ', views: 2100, inquiries: 81 }
  ];

  const revenueData = [
    { month: language === 'en' ? 'Jan' : 'જાન્યુ', revenue: 125000, commission: 12500 },
    { month: language === 'en' ? 'Feb' : 'ફેબ્રુ', revenue: 180000, commission: 18000 },
    { month: language === 'en' ? 'Mar' : 'માર્ચ', revenue: 140000, commission: 14000 },
    { month: language === 'en' ? 'Apr' : 'એપ્રિલ', revenue: 220000, commission: 22000 },
    { month: language === 'en' ? 'May' : 'મે', revenue: 190000, commission: 19000 },
    { month: language === 'en' ? 'Jun' : 'જૂન', revenue: 240000, commission: 24000 },
    { month: language === 'en' ? 'Jul' : 'જુલાઈ', revenue: 210000, commission: 21000 }
  ];

  const propertyTypeData = [
    { 
      name: language === 'en' ? 'Agricultural' : 'કૃષિ', 
      value: 65, 
      color: '#10B981' 
    },
    { 
      name: language === 'en' ? 'Residential' : 'રહેણાંક', 
      value: 20, 
      color: '#3B82F6' 
    },
    { 
      name: language === 'en' ? 'Commercial' : 'વ્યાવસાયિક', 
      value: 15, 
      color: '#F59E0B' 
    }
  ];

  const tabs = [
    {
      id: 'views',
      label: language === 'en' ? 'Views & Inquiries' : 'વ્યૂઝ અને પૂછપરછ',
      icon: 'TrendingUp'
    },
    {
      id: 'revenue',
      label: language === 'en' ? 'Revenue' : 'આવક',
      icon: 'IndianRupee'
    },
    {
      id: 'properties',
      label: language === 'en' ? 'Property Types' : 'પ્રોપર્ટી પ્રકાર',
      icon: 'PieChart'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {
                activeTab === 'revenue' 
                  ? formatCurrency(entry.value)
                  : entry.value.toLocaleString()
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Analytics Overview' : 'એનાલિટિક્સ ઓવરવ્યૂ'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en' ? 'Track your property performance' : 'તમારી પ્રોપર્ટીની કામગીરી ટ્રેક કરો'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              {language === 'en' ? 'Export' : 'એક્સપોર્ટ'}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-4 lg:p-6">
        {activeTab === 'views' && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name={language === 'en' ? 'Views' : 'વ્યૂઝ'}
                />
                <Line 
                  type="monotone" 
                  dataKey="inquiries" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  name={language === 'en' ? 'Inquiries' : 'પૂછપરછ'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-primary)" 
                  name={language === 'en' ? 'Revenue' : 'આવક'}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="commission" 
                  fill="var(--color-secondary)" 
                  name={language === 'en' ? 'Commission' : 'કમિશન'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, language === 'en' ? 'Percentage' : 'ટકાવારી']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {propertyTypeData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;