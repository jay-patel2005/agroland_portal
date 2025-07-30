import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const sortOptions = [
    { 
      value: 'relevance', 
      label: language === 'en' ? 'Most Relevant' : 'સૌથી સંબંધિત' 
    },
    { 
      value: 'price-low-high', 
      label: language === 'en' ? 'Price: Low to High' : 'કિંમત: ઓછીથી વધુ' 
    },
    { 
      value: 'price-high-low', 
      label: language === 'en' ? 'Price: High to Low' : 'કિંમત: વધુથી ઓછી' 
    },
    { 
      value: 'size-low-high', 
      label: language === 'en' ? 'Size: Small to Large' : 'કદ: નાનાથી મોટા' 
    },
    { 
      value: 'size-high-low', 
      label: language === 'en' ? 'Size: Large to Small' : 'કદ: મોટાથી નાના' 
    },
    { 
      value: 'date-newest', 
      label: language === 'en' ? 'Newest First' : 'નવા પહેલા' 
    },
    { 
      value: 'date-oldest', 
      label: language === 'en' ? 'Oldest First' : 'જૂના પહેલા' 
    },
    { 
      value: 'views-high-low', 
      label: language === 'en' ? 'Most Viewed' : 'સૌથી વધુ જોવાયેલ' 
    }
  ];

  return (
    <div className="w-full sm:w-48">
      <Select
        placeholder={language === 'en' ? 'Sort by' : 'ક્રમ અનુસાર'}
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortDropdown;