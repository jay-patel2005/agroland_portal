import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import propertyService from '../../../utils/propertyService';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);

  const quickActions = [
    {
      id: 1,
      title: language === 'en' ? 'Search Properties' : 'પ્રોપર્ટીઝ શોધો',
      description: language === 'en' ? 'Find your dream property' : 'તમારી સ્વપ્નની પ્રોપર્ટી શોધો',
      icon: 'Search',
      color: 'bg-primary text-primary-foreground',
      action: 'search-properties'
    },
    {
      id: 2,
      title: language === 'en' ? 'Saved Properties' : 'સાચવેલી પ્રોપર્ટીઝ',
      description: language === 'en' ? 'View your wishlist' : 'તમારી વિશલિસ્ટ જુઓ',
      icon: 'Heart',
      color: 'bg-destructive text-destructive-foreground',
      action: 'saved-properties'
    },
    {
      id: 3,
      title: language === 'en' ? 'My Inquiries' : 'મારી પૂછપરછ',
      description: language === 'en' ? 'Track your property inquiries' : 'તમારી પ્રોપર્ટી પૂછપરછને ટ્રેક કરો',
      icon: 'MessageSquare',
      color: 'bg-success text-success-foreground',
      action: 'my-inquiries'
    },
    {
      id: 4,
      title: language === 'en' ? 'Price Alerts' : 'કિંમત એલર્ટ',
      description: language === 'en' ? 'Set up price notifications' : 'કિંમત નોટિફિકેશન સેટ કરો',
      icon: 'Bell',
      color: 'bg-warning text-warning-foreground',
      action: 'price-alerts'
    },
    {
      id: 5,
      title: language === 'en' ? 'Market Trends' : 'માર્કેટ ટ્રેન્ડ્સ',
      description: language === 'en' ? 'Analyze property market trends' : 'પ્રોપર્ટી માર્કેટ ટ્રેન્ડ્સનું વિશ્લેષણ કરો',
      icon: 'TrendingUp',
      color: 'bg-indigo-500 text-white',
      action: 'market-trends'
    },
    {
      id: 6,
      title: language === 'en' ? 'Profile Settings' : 'પ્રોફાઇલ સેટિંગ્સ',
      description: language === 'en' ? 'Manage your account preferences' : 'તમારી એકાઉન્ટ પસંદગીઓ મેનેજ કરો',
      icon: 'User',
      color: 'bg-gray-500 text-white',
      action: 'profile-settings'
    }
  ];

  const handleAction = async (action) => {
    if (loading) return;

    setLoading(action);

    try {
      switch (action) {
        case 'search-properties': navigate('/property-listings-search');
          break;
          
        case 'saved-properties':
          await handleSavedProperties();
          break;
          
        case 'my-inquiries':
          await handleMyInquiries();
          break;
          
        case 'price-alerts':
          handlePriceAlerts();
          break;
          
        case 'market-trends':
          handleMarketTrends();
          break;
          
        case 'profile-settings':
          handleProfileSettings();
          break;
          
        default:
          console.log('Unknown action:', action);
      }
    } catch (error) {
      console.log('Error handling action:', error);
    } finally {
      setTimeout(() => setLoading(null), 500);
    }
  };

  const handleSavedProperties = async () => {
    if (!user?.id) {
      alert(language === 'en' ? 'Please log in to view saved properties' : 'સાચવેલી પ્રોપર્ટીઝ જોવા માટે લોગિન કરો');
      return;
    }

    try {
      const result = await propertyService.getSavedProperties(user.id);
      
      if (result.success) {
        console.log('Saved properties:', result.data);
        // Navigate to saved properties section or show modal
        // For now, we'll just log the data
        alert(`${language === 'en' ? 'You have' : 'તમારી પાસે'} ${result.data.length} ${language === 'en' ? 'saved properties' : 'સાચવેલી પ્રોપર્ટીઝ છે'}`);
      } else {
        alert(language === 'en' ? 'Failed to load saved properties' : 'સાચવેલી પ્રોપર્ટીઝ લોડ કરવામાં નિષ્ફળ');
      }
    } catch (error) {
      console.log('Error loading saved properties:', error);
      alert(language === 'en' ? 'Error loading saved properties' : 'સાચવેલી પ્રોપર્ટીઝ લોડ કરવામાં ભૂલ');
    }
  };

  const handleMyInquiries = async () => {
    if (!user?.id) {
      alert(language === 'en' ? 'Please log in to view inquiries' : 'પૂછપરછ જોવા માટે લોગિન કરો');
      return;
    }

    // This would typically load inquiries from the inquiry service
    console.log('Loading user inquiries...');
    alert(language === 'en' ? 'Inquiries section - Coming soon!' : 'પૂછપરછ વિભાગ - જલ્દી આવશે!');
  };

  const handlePriceAlerts = () => {
    console.log('Setting up price alerts...');
    alert(language === 'en' ? 'Price alerts feature - Coming soon!' : 'કિંમત એલર્ટ સુવિધા - જલ્દી આવશે!');
  };

  const handleMarketTrends = () => {
    console.log('Loading market trends...');
    alert(language === 'en' ? 'Market trends analysis - Coming soon!' : 'માર્કેટ ટ્રેન્ડ્સ એનાલિસિસ - જલ્દી આવશે!');
  };

  const handleProfileSettings = () => {
    console.log('Opening profile settings...');
    alert(language === 'en' ? 'Profile settings - Coming soon!' : 'પ્રોફાઇલ સેટિંગ્સ - જલ્દી આવશે!');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Quick Actions' : 'ઝડપી ક્રિયાઓ'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en' ? 'Quick access to frequently used features' : 'વારંવાર ઉપયોગમાં લેવાતી સુવિધાઓની ઝડપી પહોંચ'}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              onClick={() => handleAction(action.action)}
              className={`group relative bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-border ${
                loading === action.action ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`${action.color} rounded-lg p-2 group-hover:scale-110 transition-transform`}>
                  {loading === action.action ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    <Icon name={action.icon} size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 lg:p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Need help finding the right property?' : 'યોગ્ય પ્રોપર્ટી શોધવામાં મદદ જોઈએ છે?'}
          </div>
          <Button variant="outline" size="sm">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            {language === 'en' ? 'Get Help' : 'મદદ મેળવો'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;