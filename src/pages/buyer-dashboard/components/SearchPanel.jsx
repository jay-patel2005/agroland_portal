import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchPanel = () => {
  const [language, setLanguage] = useState('en');
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    district: '',
    taluka: '',
    village: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    landType: '',
    availability: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const districtOptions = [
    { value: 'ahmedabad', label: language === 'en' ? 'Ahmedabad' : 'અમદાવાદ' },
    { value: 'surat', label: language === 'en' ? 'Surat' : 'સુરત' },
    { value: 'vadodara', label: language === 'en' ? 'Vadodara' : 'વડોદરા' },
    { value: 'rajkot', label: language === 'en' ? 'Rajkot' : 'રાજકોટ' },
    { value: 'bhavnagar', label: language === 'en' ? 'Bhavnagar' : 'ભાવનગર' }
  ];

  const talukaOptions = [
    { value: 'city', label: language === 'en' ? 'City' : 'શહેર' },
    { value: 'daskroi', label: language === 'en' ? 'Daskroi' : 'દાસક્રોઈ' },
    { value: 'sanand', label: language === 'en' ? 'Sanand' : 'સાણંદ' },
    { value: 'dholka', label: language === 'en' ? 'Dholka' : 'ઢોલકા' }
  ];

  const landTypeOptions = [
    { value: 'agricultural', label: language === 'en' ? 'Agricultural' : 'કૃષિ' },
    { value: 'residential', label: language === 'en' ? 'Residential' : 'રહેણાંક' },
    { value: 'commercial', label: language === 'en' ? 'Commercial' : 'વ્યાપારી' },
    { value: 'industrial', label: language === 'en' ? 'Industrial' : 'ઔદ્યોગિક' }
  ];

  const availabilityOptions = [
    { value: 'immediate', label: language === 'en' ? 'Immediate' : 'તાત્કાલિક' },
    { value: 'within_month', label: language === 'en' ? 'Within Month' : 'મહિનામાં' },
    { value: 'within_quarter', label: language === 'en' ? 'Within Quarter' : 'ત્રિમાસિકમાં' }
  ];

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search filters:', searchFilters);
    // Navigate to property listings with filters
    window.location.href = '/property-listings-search';
  };

  const handleSaveSearch = () => {
    console.log('Saving search:', searchFilters);
    // Save search logic here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {language === 'en' ? 'Advanced Search' : 'એડવાન્સ સર્ચ'}
        </h3>
        <Button variant="ghost" size="sm" iconName="Filter">
          {language === 'en' ? 'Filters' : 'ફિલ્ટર'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Location Search */}
        <Input
          label={language === 'en' ? 'Search Location' : 'સ્થાન શોધો'}
          type="text"
          placeholder={language === 'en' ? 'Enter location...' : 'સ્થાન દાખલ કરો...'}
          value={searchFilters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />

        {/* District */}
        <Select
          label={language === 'en' ? 'District' : 'જિલ્લો'}
          placeholder={language === 'en' ? 'Select district' : 'જિલ્લો પસંદ કરો'}
          options={districtOptions}
          value={searchFilters.district}
          onChange={(value) => handleFilterChange('district', value)}
        />

        {/* Taluka */}
        <Select
          label={language === 'en' ? 'Taluka' : 'તાલુકો'}
          placeholder={language === 'en' ? 'Select taluka' : 'તાલુકો પસંદ કરો'}
          options={talukaOptions}
          value={searchFilters.taluka}
          onChange={(value) => handleFilterChange('taluka', value)}
        />

        {/* Price Range */}
        <Input
          label={language === 'en' ? 'Min Price (₹)' : 'લઘુત્તમ કિંમત (₹)'}
          type="number"
          placeholder={language === 'en' ? 'Min price' : 'લઘુત્તમ કિંમત'}
          value={searchFilters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
        />

        <Input
          label={language === 'en' ? 'Max Price (₹)' : 'મહત્તમ કિંમત (₹)'}
          type="number"
          placeholder={language === 'en' ? 'Max price' : 'મહત્તમ કિંમત'}
          value={searchFilters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
        />

        {/* Area Range */}
        <Input
          label={language === 'en' ? 'Min Area (sq ft)' : 'લઘુત્તમ વિસ્તાર (sq ft)'}
          type="number"
          placeholder={language === 'en' ? 'Min area' : 'લઘુત્તમ વિસ્તાર'}
          value={searchFilters.minArea}
          onChange={(e) => handleFilterChange('minArea', e.target.value)}
        />

        {/* Land Type */}
        <Select
          label={language === 'en' ? 'Land Type' : 'જમીનનો પ્રકાર'}
          placeholder={language === 'en' ? 'Select type' : 'પ્રકાર પસંદ કરો'}
          options={landTypeOptions}
          value={searchFilters.landType}
          onChange={(value) => handleFilterChange('landType', value)}
        />

        {/* Availability */}
        <Select
          label={language === 'en' ? 'Availability' : 'ઉપલબ્ધતા'}
          placeholder={language === 'en' ? 'Select availability' : 'ઉપલબ્ધતા પસંદ કરો'}
          options={availabilityOptions}
          value={searchFilters.availability}
          onChange={(value) => handleFilterChange('availability', value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="default" 
          onClick={handleSearch}
          iconName="Search"
          iconPosition="left"
          className="flex-1"
        >
          {language === 'en' ? 'Search Properties' : 'પ્રોપર્ટીઝ શોધો'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleSaveSearch}
          iconName="Bookmark"
          iconPosition="left"
        >
          {language === 'en' ? 'Save Search' : 'સર્ચ સાચવો'}
        </Button>
      </div>
    </div>
  );
};

export default SearchPanel;