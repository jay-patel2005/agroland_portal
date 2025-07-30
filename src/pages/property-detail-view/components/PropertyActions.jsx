import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyActions = ({ property }) => {
  const [language, setLanguage] = useState('en');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Check if property is favorited
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(property.id));
  }, [property.id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorited) {
      updatedFavorites = favorites.filter(id => id !== property.id);
    } else {
      updatedFavorites = [...favorites, property.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareData = {
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert(language === 'en' ?'Property link copied to clipboard!' :'પ્રોપર્ટી લિંક ક્લિપબોર્ડમાં કૉપી થઈ ગઈ!'
        );
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReport = () => {
    alert(language === 'en' ?'Thank you for reporting. We will review this property.' :'રિપોર્ટ કરવા બદલ આભાર. અમે આ પ્રોપર્ટીની સમીક્ષા કરીશું.'
    );
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      action: () => {
        const message = encodeURIComponent(`Check out this property: ${property.title} - ${window.location.href}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      action: () => {
        const text = encodeURIComponent(`Check out this property: ${property.title}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: 'Mail',
      action: () => {
        const subject = encodeURIComponent(`Property: ${property.title}`);
        const body = encodeURIComponent(`I found this property that might interest you:\n\n${property.title}\n${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2">
      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant={isFavorited ? 'default' : 'outline'}
          onClick={handleFavorite}
          iconName={isFavorited ? 'Heart' : 'Heart'}
          iconPosition="left"
          className={isFavorited ? 'text-destructive' : ''}
        >
          {language === 'en' ? (isFavorited ?'Favorited' : 'Add to Favorites')
            : (isFavorited ? 'પસંદીદામાં' : 'પસંદીદામાં ઉમેરો')
          }
        </Button>
        
        <Button
          variant="outline"
          onClick={handleShare}
          loading={isSharing}
          iconName="Share2"
          iconPosition="left"
        >
          {language === 'en' ? 'Share' : 'શેર કરો'}
        </Button>
      </div>

      {/* Share Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          {language === 'en' ? 'Share on' : 'શેર કરો'}
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="ghost"
              size="sm"
              onClick={option.action}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Icon name={option.icon} size={20} className="mb-1" />
              <span className="text-xs">{option.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="space-y-2 mb-6">
        <Button
          variant="ghost"
          onClick={handlePrint}
          iconName="Printer"
          iconPosition="left"
          className="w-full justify-start"
        >
          {language === 'en' ? 'Print Details' : 'વિગતો પ્રિન્ટ કરો'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleReport}
          iconName="Flag"
          iconPosition="left"
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          {language === 'en' ? 'Report Property' : 'પ્રોપર્ટી રિપોર્ટ કરો'}
        </Button>
      </div>

      {/* Property Stats */}
      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{property.viewCount}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'en' ? 'Views' : 'જોવાયેલ'}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{property.inquiries}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'en' ? 'Inquiries' : 'પૂછપરછ'}
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          {language === 'en' ? 'Last updated' : 'છેલ્લે અપડેટ થયેલ'}: {' '}
          {new Date(property.lastUpdated).toLocaleDateString('en-GB')}
        </div>
      </div>
    </div>
  );
};

export default PropertyActions;