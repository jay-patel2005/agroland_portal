import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Image from '../../components/AppImage';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (userRole === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/home-landing-page');
      }
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userEmail', formData.email);
      
      // Navigate based on role
      if (formData.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (formData.role === 'seller') {
        navigate('/seller-dashboard');
      } else if (formData.role === 'admin') {
        navigate('/home-landing-page');
      }
    } catch (err) {
      setError(language === 'en' ? 'Login failed. Please try again.' : 'લોગિન નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userMobile', formData.mobile);
      
      // Navigate based on role
      if (formData.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (formData.role === 'seller') {
        navigate('/seller-dashboard');
      }
    } catch (err) {
      setError(language === 'en' ? 'Registration failed. Please try again.' : 'નોંધણી નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social login as buyer
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'buyer');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      navigate('/buyer-dashboard');
    } catch (err) {
      setError(language === 'en' ? 'Social login failed. Please try again.' : 'સોશિયલ લોગિન નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error('Password reset failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80"
            alt="Agricultural landscape background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md">
              {/* Auth Card */}
              <div className="bg-card rounded-lg shadow-elevation-3 p-6 lg:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {language === 'en' ? 'Welcome to AgroLand' : 'AgroLand માં આપનું સ્વાગત છે'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {activeTab === 'login' 
                      ? (language === 'en' ? 'Sign in to your account' : 'તમારા ખાતામાં સાઇન ઇન કરો')
                      : (language === 'en' ? 'Create your new account' : 'તમારું નવું ખાતું બનાવો')
                    }
                  </p>
                </div>

                {/* Auth Tabs */}
                <AuthTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  language={language}
                />

                {/* Auth Forms */}
                {activeTab === 'login' ? (
                  <LoginForm
                    language={language}
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                  />
                ) : (
                  <RegisterForm
                    language={language}
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                  />
                )}

                {/* Social Authentication */}
                <SocialAuth
                  language={language}
                  onSocialLogin={handleSocialLogin}
                  loading={loading}
                />

                {/* Footer Links */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'login' 
                      ? (language === 'en' ? "Don't have an account? " : "ખાતું નથી? ")
                      : (language === 'en' ? "Already have an account? " : "પહેલેથી ખાતું છે? ")
                    }
                    <button
                      onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                      className="text-primary hover:text-primary/80 transition-micro font-medium"
                    >
                      {activeTab === 'login' 
                        ? (language === 'en' ? 'Sign up' : 'સાઇન અપ')
                        : (language === 'en' ? 'Sign in' : 'સાઇન ઇન')
                      }
                    </button>
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-white/80">
                  {language === 'en' ?'By continuing, you agree to our Terms of Service and Privacy Policy' :'ચાલુ રાખીને, તમે અમારી સેવાની શરતો અને ગોપનીયતા નીતિ સાથે સંમત થાઓ છો'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        language={language}
        onSubmit={handleForgotPassword}
        loading={loading}
      />
    </div>
  );
};

export default AuthenticationPage;