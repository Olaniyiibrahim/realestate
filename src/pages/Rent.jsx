import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const Rent = () => {
  const [filters, setFilters] = useState({
    bedrooms: '',
    priceRange: [0, 5000],
    propertyType: ''
  });

  // Sample rental properties data
  const rentalProperties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      address: '123 City Ave, New York, NY',
      price: '$2,500/mo',
      beds: 2,
      baths: 1,
      sqft: 1200,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Cozy Suburban House',
      address: '456 Oak Lane, Austin, TX',
      price: '$1,800/mo',
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'House',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Luxury Waterfront Condo',
      address: '789 Beach Blvd, Miami, FL',
      price: '$3,200/mo',
      beds: 2,
      baths: 2,
      sqft: 1500,
      type: 'Condo',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: 'Chic Studio Apartment',
      address: '321 Urban St, San Francisco, CA',
      price: '$1,950/mo',
      beds: 1,
      baths: 1,
      sqft: 800,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredProperties = rentalProperties.filter(property => {
    return (
      (filters.bedrooms === '' || property.beds === parseInt(filters.bedrooms)) &&
      (filters.propertyType === '' || property.type === filters.propertyType)
  )});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rental Properties</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find your perfect rental home
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleFilterChange}
              value={filters.bedrooms}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleFilterChange}
              value={filters.propertyType}
            >
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price: ${filters.priceRange[1]}
            </label>
            <input
              type="range"
              id="priceRange"
              name="priceRange"
              min="500"
              max="5000"
              step="100"
              className="w-full"
              onChange={(e) => setFilters({...filters, priceRange: [0, e.target.value]})}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$500</span>
              <span>$5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard 
            key={property.id}
            property={property}
            isRental={true}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties match your current filters.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setFilters({
              bedrooms: '',
              priceRange: [0, 5000],
              propertyType: ''
            })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Rent;