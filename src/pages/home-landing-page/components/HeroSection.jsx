import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const districts = [
    { value: 'ahmedabad', label: language === 'en' ? 'Ahmedabad' : 'અમદાવાદ' },
    { value: 'surat', label: language === 'en' ? 'Surat' : 'સુરત' },
    { value: 'vadodara', label: language === 'en' ? 'Vadodara' : 'વડોદરા' },
    { value: 'rajkot', label: language === 'en' ? 'Rajkot' : 'રાજકોટ' },
    { value: 'bhavnagar', label: language === 'en' ? 'Bhavnagar' : 'ભાવનગર' },
    { value: 'gandhinagar', label: language === 'en' ? 'Gandhinagar' : 'ગાંધીનગર' }
  ];

  const talukas = {
    ahmedabad: [
      { value: 'city', label: language === 'en' ? 'City' : 'શહેર' },
      { value: 'daskroi', label: language === 'en' ? 'Daskroi' : 'દાસક્રોઈ' },
      { value: 'sanand', label: language === 'en' ? 'Sanand' : 'સાણંદ' }
    ],
    surat: [
      { value: 'city', label: language === 'en' ? 'City' : 'શહેર' },
      { value: 'chorasi', label: language === 'en' ? 'Chorasi' : 'ચોરાસી' },
      { value: 'palsana', label: language === 'en' ? 'Palsana' : 'પાલસાણા' }
    ],
    vadodara: [
      { value: 'city', label: language === 'en' ? 'City' : 'શહેર' },
      { value: 'padra', label: language === 'en' ? 'Padra' : 'પાદરા' },
      { value: 'savli', label: language === 'en' ? 'Savli' : 'સાવલી' }
    ]
  };

  const villages = {
    city: [
      { value: 'bopal', label: language === 'en' ? 'Bopal' : 'બોપલ' },
      { value: 'gota', label: language === 'en' ? 'Gota' : 'ગોટા' },
      { value: 'shela', label: language === 'en' ? 'Shela' : 'શેલા' }
    ],
    daskroi: [
      { value: 'motera', label: language === 'en' ? 'Motera' : 'મોટેરા' },
      { value: 'chandkheda', label: language === 'en' ? 'Chandkheda' : 'ચાંદખેડા' },
      { value: 'ranip', label: language === 'en' ? 'Ranip' : 'રાણીપ' }
    ],
    sanand: [
      { value: 'khoraj', label: language === 'en' ? 'Khoraj' : 'ખોરાજ' },
      { value: 'bavla', label: language === 'en' ? 'Bavla' : 'બાવળા' },
      { value: 'viramgam', label: language === 'en' ? 'Viramgam' : 'વિરમગામ' }
    ]
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('search', searchQuery);
    if (selectedDistrict) searchParams.set('district', selectedDistrict);
    if (selectedTaluka) searchParams.set('taluka', selectedTaluka);
    if (selectedVillage) searchParams.set('village', selectedVillage);
    
    navigate(`/property-listings-search?${searchParams.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            {language === 'en' ? 'FIND YOUR PERFECT LAND' : 'તમારી સંપૂર્ણ જમીન શોધો'}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            {language === 'en' ?'Discover premium agricultural properties across Gujarat with our comprehensive marketplace platform' :'અમારા વ્યાપક માર્કેટપ્લેસ પ્લેટફોર્મ સાથે ગુજરાતમાં પ્રીમિયમ કૃષિ મિલકતો શોધો'
            }
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-elevation-3 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search Input */}
              <div className="lg:col-span-1">
                <Input
                  type="search"
                  placeholder={language === 'en' ? 'Search properties...' : 'પ્રોપર્ટીઝ શોધો...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* District Select */}
              <div>
                <Select
                  placeholder={language === 'en' ? 'Select District' : 'જિલ્લો પસંદ કરો'}
                  options={districts}
                  value={selectedDistrict}
                  onChange={setSelectedDistrict}
                  searchable
                />
              </div>

              {/* Taluka Select */}
              <div>
                <Select
                  placeholder={language === 'en' ? 'Select Taluka' : 'તાલુકો પસંદ કરો'}
                  options={selectedDistrict ? talukas[selectedDistrict] || [] : []}
                  value={selectedTaluka}
                  onChange={setSelectedTaluka}
                  disabled={!selectedDistrict}
                  searchable
                />
              </div>

              {/* Village Select */}
              <div>
                <Select
                  placeholder={language === 'en' ? 'Select Village' : 'ગામ પસંદ કરો'}
                  options={selectedTaluka ? villages[selectedTaluka] || [] : []}
                  value={selectedVillage}
                  onChange={setSelectedVillage}
                  disabled={!selectedTaluka}
                  searchable
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              variant="default"
              size="lg"
              onClick={handleSearch}
              iconName="Search"
              iconPosition="left"
              className="w-full md:w-auto px-12"
            >
              {language === 'en' ? 'Search Properties' : 'પ્રોપર્ટીઝ શોધો'}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-white">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">2,500+</div>
              <div className="text-sm md:text-base opacity-90">
                {language === 'en' ? 'Properties Listed' : 'સૂચિબદ્ધ પ્રોપર્ટીઝ'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
              <div className="text-sm md:text-base opacity-90">
                {language === 'en' ? 'Happy Buyers' : 'ખુશ ખરીદદારો'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">850+</div>
              <div className="text-sm md:text-base opacity-90">
                {language === 'en' ? 'Verified Sellers' : 'ચકાસાયેલ વેચનારા'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-sm md:text-base opacity-90">
                {language === 'en' ? 'Districts Covered' : 'આવરી લેવાયેલા જિલ્લાઓ'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;