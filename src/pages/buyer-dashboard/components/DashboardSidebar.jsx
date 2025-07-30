import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardSidebar = ({ isOpen, onToggle }) => {
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const sidebarItems = [
    {
      id: 'overview',
      label: language === 'en' ? 'Overview' : 'ઝાંખી',
      icon: 'LayoutDashboard',
      path: '/buyer-dashboard',
      isActive: location.pathname === '/buyer-dashboard'
    },
    {
      id: 'search',
      label: language === 'en' ? 'Property Search' : 'પ્રોપર્ટી શોધ',
      icon: 'Search',
      path: '/property-listings-search',
      isActive: false
    },
    {
      id: 'saved',
      label: language === 'en' ? 'Saved Properties' : 'સાચવેલી પ્રોપર્ટીઝ',
      icon: 'Heart',
      path: '#saved',
      isActive: false
    },
    {
      id: 'inquiries',
      label: language === 'en' ? 'Inquiries' : 'પૂછપરછ',
      icon: 'MessageSquare',
      path: '#inquiries',
      isActive: false
    },
    {
      id: 'profile',
      label: language === 'en' ? 'Profile' : 'પ્રોફાઇલ',
      icon: 'User',
      path: '#profile',
      isActive: false
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border shadow-elevation-2
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {language === 'en' ? 'Dashboard' : 'ડેશબોર્ડ'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-micro hover:bg-accent hover:text-accent-foreground
                ${item.isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground'
                }
              `}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="space-y-2">
            <Link to="/property-listings-search">
              <Button variant="default" size="sm" className="w-full" iconName="Plus" iconPosition="left">
                {language === 'en' ? 'Find Properties' : 'પ્રોપર્ટીઝ શોધો'}
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="w-full" iconName="Bell" iconPosition="left">
              {language === 'en' ? 'Alerts' : 'અલર્ટ'}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;