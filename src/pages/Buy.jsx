import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const Buy = () => {
  const [filters, setFilters] = useState({
    bedrooms: '',
    priceRange: [0, 2000000],
    propertyType: ''
  });

  // Sample properties for sale data
  const propertiesForSale = [
    {
    id: 1,
    title: 'Luxury Waterfront Villa',
    price: '$2,500,000',
    location: 'Miami Beach, FL',
    beds: 5,
    baths: 4,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80' // (unchanged - pool)
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    price: '$1,200,000',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80' // Changed to modern loft exterior
  },
  {
    id: 3,
    title: 'Suburban Family Home',
    price: '$650,000',
    location: 'Austin, TX',
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80' // (unchanged - interior)
  },
  {
    id: 5,
    title: 'Modern Luxury Villa',
    address: '123 Palm Street, Miami, FL',
    price: '$1,250,000',
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', // Changed to villa exterior
    featured: true
  },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredProperties = propertiesForSale.filter(property => {
    const price = parseInt(property.price.replace(/[^0-9]/g, ''));
    return (
      (filters.bedrooms === '' || property.beds >= parseInt(filters.bedrooms)) &&
      (filters.propertyType === '' || property.type === filters.propertyType) &&
      price >= filters.priceRange[0] && price <= filters.priceRange[1]
    );
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Homes For Sale</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find your dream home today
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
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Land">Land</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
            </label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({...filters, priceRange: [e.target.value, filters.priceRange[1]]})}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], e.target.value]})}
              />
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
            isRental={false}
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
              priceRange: [0, 2000000],
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

export default Buy;

