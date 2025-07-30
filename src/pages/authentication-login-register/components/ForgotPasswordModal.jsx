import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose, language, onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError(language === 'en' ? 'Email is required' : 'ઇમેઇલ આવશ્યક છે');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(language === 'en' ? 'Please enter a valid email' : 'કૃપા કરીને માન્ય ઇમેઇલ દાખલ કરો');
      return;
    }
    
    setError('');
    onSubmit(email);
    setSuccess(true);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold">
            {language === 'en' ? 'Reset Password' : 'પાસવર્ડ રીસેટ કરો'}
          </h2>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Check your email' : 'તમારું ઇમેઇલ તપાસો'}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {language === 'en' ?'We\'ve sent a password reset link to your email address.' :'અમે તમારા ઇમેઇલ સરનામા પર પાસવર્ડ રીસેટ લિંક મોકલી છે.'
                }
              </p>
              <Button onClick={handleClose} variant="default" fullWidth>
                {language === 'en' ? 'Done' : 'પૂર્ણ'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'en' ?'Enter your email address and we\'ll send you a link to reset your password.' :'તમારું ઇમેઇલ સરનામું દાખલ કરો અને અમે તમને તમારો પાસવર્ડ રીસેટ કરવા માટે લિંક મોકલીશું.'
                }
              </p>

              <Input
                label={language === 'en' ? 'Email Address' : 'ઇમેઇલ સરનામું'}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder={language === 'en' ? 'Enter your email' : 'તમારું ઇમેઇલ દાખલ કરો'}
                error={error}
                required
              />

              <div className="flex space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  fullWidth
                >
                  {language === 'en' ? 'Cancel' : 'રદ કરો'}
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={loading}
                  fullWidth
                >
                  {language === 'en' ? 'Send Reset Link' : 'રીસેટ લિંક મોકલો'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;