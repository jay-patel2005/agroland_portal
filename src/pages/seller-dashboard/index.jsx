import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import PropertyTable from './components/PropertyTable';
import AnalyticsChart from './components/AnalyticsChart';
import RecentInquiries from './components/RecentInquiries';
import QuickActions from './components/QuickActions';
import PerformanceMetrics from './components/PerformanceMetrics';
import Sidebar from './components/Sidebar';

const SellerDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'gu-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (language === 'en') {
      if (hour < 12) return 'Good Morning';
      if (hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    } else {
      if (hour < 12) return 'સુપ્રભાત';
      if (hour < 17) return 'શુભ બપોર';
      return 'શુભ સાંજ';
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {language === 'en' ? 'Seller Dashboard - AgroLand Portal' : 'વેચનાર ડેશબોર્ડ - એગ્રોલેન્ડ પોર્ટલ'}
        </title>
        <meta 
          name="description" 
          content={language === 'en' ?'Manage your agricultural property listings, track performance, and analyze market engagement on AgroLand Portal' :'એગ્રોલેન્ડ પોર્ટલ પર તમારી કૃષિ પ્રોપર્ટી લિસ્ટિંગ્સ મેનેજ કરો, પરફોર્મન્સ ટ્રેક કરો અને માર્કેટ એન્ગેજમેન્ટનું વિશ્લેષણ કરો'
          } 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            language={language}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-16 z-30 bg-card border-b border-border p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Icon name="Menu" size={20} />
                </Button>
                <h1 className="text-lg font-semibold text-foreground">
                  {language === 'en' ? 'Dashboard' : 'ડેશબોર્ડ'}
                </h1>
                <Button variant="ghost" size="sm">
                  <Icon name="Bell" size={20} />
                </Button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 lg:p-8 border border-border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {getGreeting()}, {language === 'en' ? 'Rajesh!' : 'રાજેશ!'}
                    </h1>
                    <p className="text-muted-foreground mb-1">
                      {formatDate(currentTime)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ?'Welcome back to your seller dashboard. Here\'s what\'s happening with your properties today.' :'તમારા વેચનાર ડેશબોર્ડમાં પાછા આપનું સ્વાગત છે. આજે તમારી પ્રોપર્ટીઝ સાથે શું થઈ રહ્યું છે તે અહીં છે.'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {formatTime(currentTime)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Current Time' : 'વર્તમાન સમય'}
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="User" size={32} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Stats */}
              <DashboardStats language={language} />

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Properties & Analytics */}
                <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                  <PropertyTable language={language} />
                  <AnalyticsChart language={language} />
                </div>

                {/* Right Column - Inquiries & Actions */}
                <div className="space-y-6 lg:space-y-8">
                  <RecentInquiries language={language} />
                  <QuickActions language={language} />
                </div>
              </div>

              {/* Performance Metrics */}
              <PerformanceMetrics language={language} />

              {/* Recent Activity */}
              <div className="bg-card rounded-lg border border-border shadow-elevation-1">
                <div className="p-4 lg:p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === 'en' ? 'Recent Activity' : 'તાજેતરની પ્રવૃત્તિ'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'en' ? 'Latest updates and notifications' : 'નવીનતમ અપડેટ્સ અને નોટિફિકેશન્સ'}
                  </p>
                </div>
                <div className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: 'inquiry',
                        message: language === 'en' ?'New inquiry received for "Agricultural Land in Mehsana"' : '"મહેસાણામાં કૃષિ જમીન" માટે નવી પૂછપરછ મળી',
                        time: '2 minutes ago',
                        icon: 'MessageSquare',
                        color: 'text-blue-500'
                      },
                      {
                        id: 2,
                        type: 'view',
                        message: language === 'en' ?'Your property "Premium Agricultural Plot" was viewed 15 times today' : 'તમારી પ્રોપર્ટી"પ્રીમિયમ કૃષિ પ્લોટ" આજે 15 વખત જોવાઈ',
                        time: '1 hour ago',
                        icon: 'Eye',
                        color: 'text-green-500'
                      },
                      {
                        id: 3,
                        type: 'approval',
                        message: language === 'en' ?'Property "Fertile Farm Land in Anand" has been approved' : 'પ્રોપર્ટી"આનંદમાં ફળદ્રુપ ખેતીની જમીન" મંજૂર કરવામાં આવી છે',
                        time: '3 hours ago',
                        icon: 'CheckCircle',
                        color: 'text-emerald-500'
                      }
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className={`${activity.color} mt-1`}>
                          <Icon name={activity.icon} size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;