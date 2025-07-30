import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all dashboard components
import DashboardSidebar from './components/DashboardSidebar';
import MetricsCard from './components/MetricsCard';
import SearchPanel from './components/SearchPanel';
import PropertyCard from './components/PropertyCard';
import SavedPropertiesSection from './components/SavedPropertiesSection';
import InquiriesSection from './components/InquiriesSection';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AnalyticsWidget from './components/AnalyticsWidget';

const BuyerDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [recentProperties, setRecentProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'buyer') {
      navigate('/authentication-login-register');
      return;
    }

    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Mock recent properties data
    const mockRecentProperties = [
      {
        id: 1,
        title: "Premium Agricultural Land in Sanand",
        price: 2500000,
        area: 43560,
        type: "agricultural",
        location: {
          village: "Khoraj",
          taluka: "Sanand",
          district: "Ahmedabad"
        },
        image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
        status: "available",
        views: 245,
        postedDate: "2 days ago"
      },
      {
        id: 2,
        title: "Residential Plot in Dholka",
        price: 1800000,
        area: 2400,
        type: "residential",
        location: {
          village: "Dholka",
          taluka: "Dholka",
          district: "Ahmedabad"
        },
        image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
        status: "available",
        views: 189,
        postedDate: "5 days ago"
      },
      {
        id: 3,
        title: "Commercial Land in Bavla",
        price: 3200000,
        area: 5000,
        type: "commercial",
        location: {
          village: "Bavla",
          taluka: "Bavla",
          district: "Ahmedabad"
        },
        image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
        status: "pending",
        views: 156,
        postedDate: "1 week ago"
      }
    ];

    setRecentProperties(mockRecentProperties);
  }, [navigate]);

  const handleSaveProperty = (propertyId) => {
    console.log('Saving property:', propertyId);
    // Save property logic here
  };

  const handleRemoveProperty = (propertyId) => {
    console.log('Removing property:', propertyId);
    // Remove property logic here
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'saved':
        return <SavedPropertiesSection />;
      case 'inquiries':
        return <InquiriesSection />;
      case 'profile':
        return (
          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              {language === 'en' ? 'Profile Settings' : 'પ્રોફાઇલ સેટિંગ્સ'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Profile management coming soon...' : 'પ્રોફાઇલ મેનેજમેન્ટ જલ્દી આવશે...'}
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title={language === 'en' ? 'Saved Properties' : 'સાચવેલી પ્રોપર્ટીઝ'}
                value="12"
                icon="Heart"
                trend="up"
                trendValue="+3"
                color="destructive"
              />
              <MetricsCard
                title={language === 'en' ? 'Active Inquiries' : 'સક્રિય પૂછપરછ'}
                value="8"
                icon="MessageSquare"
                trend="up"
                trendValue="+2"
                color="success"
              />
              <MetricsCard
                title={language === 'en' ? 'Properties Viewed' : 'જોયેલી પ્રોપર્ટીઝ'}
                value="45"
                icon="Eye"
                trend="up"
                trendValue="+12"
                color="primary"
              />
              <MetricsCard
                title={language === 'en' ? 'Saved Searches' : 'સાચવેલી શોધ'}
                value="5"
                icon="Search"
                trend="neutral"
                trendValue="0"
                color="warning"
              />
            </div>

            {/* Search Panel */}
            <SearchPanel />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Properties */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {language === 'en' ? 'Recent Properties' : 'તાજેતરની પ્રોપર્ટીઝ'}
                    </h3>
                    <Button variant="ghost" size="sm">
                      {language === 'en' ? 'View All' : 'બધું જુઓ'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentProperties.slice(0, 4).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSave={handleSaveProperty}
                        onRemove={handleRemoveProperty}
                      />
                    ))}
                  </div>
                </div>

                {/* Analytics Widget */}
                <AnalyticsWidget />
              </div>

              {/* Right Column - Activity & Quick Actions */}
              <div className="space-y-6">
                <QuickActions />
                <ActivityFeed />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Icon name="Menu" size={20} />
              </Button>
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {language === 'en' ? 'Buyer Dashboard' : 'ખરીદદાર ડેશબોર્ડ'}
              </h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block bg-card border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {language === 'en' ? 'Buyer Dashboard' : 'ખરીદદાર ડેશબોર્ડ'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {language === 'en' ?'Manage your property search and inquiries' :'તમારી પ્રોપર્ટી શોધ અને પૂછપરછનું સંચાલન કરો'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="Bell">
                  {language === 'en' ? 'Notifications' : 'નોટિફિકેશન'}
                </Button>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
                  {language === 'en' ? 'New Search' : 'નવી શોધ'}
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;