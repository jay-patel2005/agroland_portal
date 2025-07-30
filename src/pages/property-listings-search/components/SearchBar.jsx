import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder={language === 'en' ?'Search by location, property type, or keywords...' :'સ્થાન, પ્રોપર્ટીનો પ્રકાર અથવા કીવર્ડ દ્વારા શોધો...'
          }
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-20 h-12"
        />
        
        <Icon
          name="Search"
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        
        <Button
          type="submit"
          variant="default"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {language === 'en' ? 'Search' : 'શોધો'}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;