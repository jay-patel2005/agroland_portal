import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AuthenticationLoginRegister from "pages/authentication-login-register";
import PropertyListingsSearch from "pages/property-listings-search";
import PropertyDetailView from "pages/property-detail-view";
import HomeLandingPage from "pages/home-landing-page";
import SellerDashboard from "pages/seller-dashboard";
import BuyerDashboard from "pages/buyer-dashboard";
import AboutUsPage from "pages/about-us";
import ContactUsPage from "pages/contact-us";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/property-listings-search" element={<PropertyListingsSearch />} />
        <Route path="/property-detail-view" element={<PropertyDetailView />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;