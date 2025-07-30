import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'gu' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const navigationItems = [
    {
      label: language === 'en' ? 'Home' : 'હોમ',
      path: '/home-landing-page',
      icon: 'Home',
      requiresAuth: false
    },
    {
      label: language === 'en' ? 'Properties' : 'પ્રોપર્ટીઝ',
      path: '/property-listings-search',
      icon: 'Building2',
      requiresAuth: false
    },
    {
      label: language === 'en' ? 'About Us' : 'અમારા વિશે',
      path: '/about-us',
      icon: 'Users',
      requiresAuth: false
    },
    {
      label: language === 'en' ? 'Contact' : 'સંપર્ક',
      path: '/contact-us',
      icon: 'Phone',
      requiresAuth: false
    }
  ];

  const dashboardItems = [
    {
      label: language === 'en' ? 'Buyer Dashboard' : 'ખરીદદાર ડેશબોર્ડ',
      path: '/buyer-dashboard',
      icon: 'ShoppingCart',
      requiresAuth: true,
      allowedRoles: ['buyer']
    },
    {
      label: language === 'en' ? 'Seller Dashboard' : 'વેચનાર ડેશબોર્ડ',
      path: '/seller-dashboard',
      icon: 'Store',
      requiresAuth: true,
      allowedRoles: ['seller']
    }
  ];

  const getVisibleItems = () => {
    if (user && userProfile?.role) {
      const dashboardItem = dashboardItems.find(item => 
        item.allowedRoles.includes(userProfile.role)
      );
      return [...navigationItems.slice(0, 2), dashboardItem, ...navigationItems.slice(2)].filter(Boolean);
    }
    return navigationItems;
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-elevation-1">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/home-landing-page" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.38-1.01C17.69 25.46 22 20.55 22 15V7l-10-5z"/>
                <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-heading font-bold text-foreground">
                AgroLand
              </span>
              <span className="text-sm font-caption text-muted-foreground ml-1">
                Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {getVisibleItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro hover:bg-accent hover:text-accent-foreground ${
                  isActivePath(item.path)
                    ? 'text-primary bg-accent' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Authentication */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-caption"
            >
              {language === 'en' ? 'ગુ' : 'EN'}
            </Button>

            {/* Authentication */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="text-sm text-muted-foreground">
                  {userProfile?.full_name || user.email}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  {language === 'en' ? 'Logout' : 'લોગઆઉટ'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/authentication-login-register?mode=login">
                  <Button variant="ghost" size="sm">
                    {language === 'en' ? 'Login' : 'લોગિન'}
                  </Button>
                </Link>
                <Link to="/authentication-login-register?mode=register">
                  <Button variant="default" size="sm">
                    {language === 'en' ? 'Sign Up' : 'સાઇન અપ'}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-caption"
            >
              {language === 'en' ? 'ગુ' : 'EN'}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down">
            <nav className="space-y-2">
              {getVisibleItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-micro ${
                    isActivePath(item.path)
                      ? 'text-primary bg-accent' :'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      {userProfile?.full_name || user.email}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      iconName="LogOut"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      {language === 'en' ? 'Logout' : 'લોગઆઉટ'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/authentication-login-register?mode=login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {language === 'en' ? 'Login' : 'લોગિન'}
                      </Button>
                    </Link>
                    <Link to="/authentication-login-register?mode=register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" className="w-full">
                        {language === 'en' ? 'Sign Up' : 'સાઇન અપ'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;