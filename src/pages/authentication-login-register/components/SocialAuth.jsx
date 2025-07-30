import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuth = ({ language, onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">
            {language === 'en' ? 'Or continue with' : 'અથવા આની સાથે ચાલુ રાખો'}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => onSocialLogin(provider.id)}
            disabled={loading}
            className="w-full"
          >
            <Icon name={provider.icon} size={18} className="mr-2" />
            {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;