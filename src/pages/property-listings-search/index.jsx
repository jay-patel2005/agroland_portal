import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import FilterChips from './components/FilterChips';
import PropertyGrid from './components/PropertyGrid';
import MapView from './components/MapView';

const PropertyListingsSearch = () => {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    district: '',
    taluka: '',
    village: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    propertyTypes: [],
    availabilityStatus: 'all'
  });

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Premium Agricultural Land in Bavla",
      price: 2500000,
      size: 5.5,
      type: "agricultural",
      status: "available",
      district: "ahmedabad",
      taluka: "daskroi",
      village: "bavla",
      description: `Fertile agricultural land with excellent water supply and road connectivity. Perfect for organic farming and crop cultivation. The land has rich black soil suitable for cotton, wheat, and vegetable farming.`,
      images: [
        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg",
        "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg"
      ],
      viewCount: 245,
      listedDate: "2025-01-10T10:00:00Z",
      seller: {
        name: "Ramesh Patel",
        phone: "+91 98765 43210"
      }
    },
    {
      id: 2,
      title: "Residential Plot Near Highway",
      price: 1800000,
      size: 2.0,
      type: "residential",
      status: "available",
      district: "ahmedabad",
      taluka: "sanand",
      village: "sarkhej",
      description: `Well-located residential plot with clear title and all necessary approvals. Close to schools, hospitals, and shopping centers. Ideal for building your dream home.`,
      images: [
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg"
      ],
      viewCount: 189,
      listedDate: "2025-01-08T14:30:00Z",
      seller: {
        name: "Priya Shah",
        phone: "+91 87654 32109"
      }
    },
    {
      id: 3,
      title: "Commercial Land for Business",
      price: 5000000,
      size: 3.2,
      type: "commercial",
      status: "pending",
      district: "surat",
      taluka: "city",
      village: "adajan",
      description: `Prime commercial land in developing area with high growth potential. Suitable for retail, office complex, or mixed-use development. Excellent investment opportunity.`,
      images: [
        "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
        "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg"
      ],
      viewCount: 156,
      listedDate: "2025-01-05T09:15:00Z",
      seller: {
        name: "Kiran Modi",
        phone: "+91 76543 21098"
      }
    },
    {
      id: 4,
      title: "Industrial Plot with Factory Shed",
      price: 8500000,
      size: 8.0,
      type: "industrial",
      status: "available",
      district: "vadodara",
      taluka: "city",
      village: "makarpura",
      description: `Large industrial plot with existing factory shed and power connection. Perfect for manufacturing units, warehouses, or logistics operations. Ready to move in.`,
      images: [
        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg"
      ],
      viewCount: 298,
      listedDate: "2025-01-03T16:45:00Z",
      seller: {
        name: "Vijay Desai",
        phone: "+91 65432 10987"
      }
    },
    {
      id: 5,
      title: "Organic Farm Land with Bore Well",
      price: 3200000,
      size: 6.8,
      type: "agricultural",
      status: "available",
      district: "rajkot",
      taluka: "city",
      village: "gondal",
      description: `Certified organic farm land with bore well and drip irrigation system. Ideal for sustainable farming practices. Includes farm house and storage facilities.`,
      images: [
        "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg"
      ],
      viewCount: 167,
      listedDate: "2025-01-01T11:20:00Z",
      seller: {
        name: "Mahesh Joshi",
        phone: "+91 54321 09876"
      }
    },
    {
      id: 6,
      title: "Luxury Residential Plot",
      price: 4500000,
      size: 1.5,
      type: "residential",
      status: "sold",
      district: "ahmedabad",
      taluka: "city",
      village: "bopal",
      description: `Premium residential plot in gated community with all modern amenities. Club house, swimming pool, and 24/7 security. Perfect for luxury home construction.`,
      images: [
        "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
      ],
      viewCount: 412,
      listedDate: "2024-12-28T13:10:00Z",
      seller: {
        name: "Neha Agarwal",
        phone: "+91 43210 98765"
      }
    }
  ];

  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Filter and search logic
  const applyFiltersAndSearch = useCallback(() => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockProperties];

      // Apply search query
      if (searchQuery.trim()) {
        filtered = filtered.filter(property =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.taluka.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.village.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply location filters
      if (filters.district) {
        filtered = filtered.filter(property => property.district === filters.district);
      }
      if (filters.taluka) {
        filtered = filtered.filter(property => property.taluka === filters.taluka);
      }
      if (filters.village) {
        filtered = filtered.filter(property => property.village === filters.village);
      }

      // Apply price filters
      if (filters.minPrice) {
        filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
      }

      // Apply size filters
      if (filters.minSize) {
        filtered = filtered.filter(property => property.size >= parseFloat(filters.minSize));
      }
      if (filters.maxSize) {
        filtered = filtered.filter(property => property.size <= parseFloat(filters.maxSize));
      }

      // Apply property type filters
      if (filters.propertyTypes.length > 0) {
        filtered = filtered.filter(property => filters.propertyTypes.includes(property.type));
      }

      // Apply availability status filter
      if (filters.availabilityStatus !== 'all') {
        filtered = filtered.filter(property => property.status === filters.availabilityStatus);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'size-low-high':
          filtered.sort((a, b) => a.size - b.size);
          break;
        case 'size-high-low':
          filtered.sort((a, b) => b.size - a.size);
          break;
        case 'date-newest':
          filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
          break;
        case 'date-oldest':
          filtered.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate));
          break;
        case 'views-high-low':
          filtered.sort((a, b) => b.viewCount - a.viewCount);
          break;
        default:
          // Keep original order for relevance
          break;
      }

      setFilteredProperties(filtered);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters, sortBy]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  const handleFilterRemove = (key, value) => {
    if (key === 'propertyType') {
      setFilters(prev => ({
        ...prev,
        propertyTypes: prev.propertyTypes.filter(type => type !== value)
      }));
    } else if (key === 'price') {
      setFilters(prev => ({
        ...prev,
        minPrice: '',
        maxPrice: ''
      }));
    } else if (key === 'size') {
      setFilters(prev => ({
        ...prev,
        minSize: '',
        maxSize: ''
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      district: '',
      taluka: '',
      village: '',
      minPrice: '',
      maxPrice: '',
      minSize: '',
      maxSize: '',
      propertyTypes: [],
      availabilityStatus: 'all'
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            {language === 'en' ? 'Property Listings' : 'પ્રોપર્ટી લિસ્ટિંગ'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ?'Discover the perfect agricultural land for your needs' :'તમારી જરૂરિયાતો માટે સંપૂર્ણ કૃષિ જમીન શોધો'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={applyFiltersAndSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
                className="w-full"
              >
                {language === 'en' ? 'Filters' : 'ફિલ્ટર'}
              </Button>
            </div>

            {/* Filter Chips */}
            <FilterChips
              filters={filters}
              onFilterRemove={handleFilterRemove}
              onClearAll={clearAllFilters}
            />

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Results Count */}
              <div className="text-muted-foreground">
                {language === 'en' 
                  ? `${filteredProperties.length} properties found`
                  : `${filteredProperties.length} પ્રોપર્ટીઝ મળી`
                }
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* View Mode Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="px-3"
                  >
                    <Icon name="Map" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
              <PropertyGrid
                properties={filteredProperties}
                loading={loading}
              />
            ) : (
              <div className="h-96 lg:h-[600px]">
                <MapView
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={setSelectedProperty}
                />
              </div>
            )}

            {/* Load More Button */}
            {!loading && filteredProperties.length > 0 && viewMode === 'grid' && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Load more functionality
                    console.log('Load more properties');
                  }}
                >
                  {language === 'en' ? 'Load More Properties' : 'વધુ પ્રોપર્ટીઝ લોડ કરો'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyListingsSearch;