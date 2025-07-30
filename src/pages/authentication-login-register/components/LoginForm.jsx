import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ language, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    buyer: { email: 'buyer@agroland.com', password: 'buyer123' },
    seller: { email: 'seller@agroland.com', password: 'seller123' },
    admin: { email: 'admin@agroland.com', password: 'admin123' }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = language === 'en' ? 'Email is required' : 'ઇમેઇલ આવશ્યક છે';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'en' ? 'Please enter a valid email' : 'કૃપા કરીને માન્ય ઇમેઇલ દાખલ કરો';
    }
    
    if (!formData.password) {
      errors.password = language === 'en' ? 'Password is required' : 'પાસવર્ડ આવશ્યક છે';
    } else if (formData.password.length < 6) {
      errors.password = language === 'en' ? 'Password must be at least 6 characters' : 'પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવો જોઈએ';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Check mock credentials
      const userRole = Object.keys(mockCredentials).find(role => 
        mockCredentials[role].email === formData.email && 
        mockCredentials[role].password === formData.password
      );
      
      if (userRole) {
        onSubmit({ ...formData, role: userRole });
      } else {
        setFormErrors({
          general: language === 'en' ?'Invalid credentials. Use: buyer@agroland.com/buyer123, seller@agroland.com/seller123, or admin@agroland.com/admin123' :'અમાન્ય ઓળખપત્રો. ઉપયોગ કરો: buyer@agroland.com/buyer123, seller@agroland.com/seller123, અથવા admin@agroland.com/admin123'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formErrors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{formErrors.general}</p>
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <Input
        label={language === 'en' ? 'Email Address' : 'ઇમેઇલ સરનામું'}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={language === 'en' ? 'Enter your email' : 'તમારું ઇમેઇલ દાખલ કરો'}
        error={formErrors.email}
        required
      />

      <div className="relative">
        <Input
          label={language === 'en' ? 'Password' : 'પાસવર્ડ'}
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={language === 'en' ? 'Enter your password' : 'તમારો પાસવર્ડ દાખલ કરો'}
          error={formErrors.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          label={language === 'en' ? 'Remember me' : 'મને યાદ રાખો'}
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-micro"
        >
          {language === 'en' ? 'Forgot Password?' : 'પાસવર્ડ ભૂલી ગયા?'}
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        loading={loading}
        fullWidth
        className="mt-6"
      >
        {language === 'en' ? 'Sign In' : 'સાઇન ઇન'}
      </Button>

      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <p className="text-xs text-muted-foreground mb-2">
          {language === 'en' ? 'Demo Credentials:' : 'ડેમો ઓળખપત્રો:'}
        </p>
        <div className="space-y-1 text-xs font-data">
          <div>Buyer: buyer@agroland.com / buyer123</div>
          <div>Seller: seller@agroland.com / seller123</div>
          <div>Admin: admin@agroland.com / admin123</div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;