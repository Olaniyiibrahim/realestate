// Updated FeaturedProperties.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { propertyDetailsData, featuredProperties } from '../properties/propertyData';
import Map from '../../components/Map';
 const FeaturedProperties = () => {
  // Create a Set of property detail IDs for efficient lookup
  const availablePropertyIds = new Set(propertyDetailsData.map(property => property.id));
  
  // Filter featured properties to only show those with corresponding details
  const displayProperty = featuredProperties.filter(property => 
    availablePropertyIds.has(property.id)
  );
  const displayProperties = displayProperty.filter(property => property.id <= 4  )

  if (displayProperties.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-2 text-lg text-gray-600">
              No featured properties available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
          <p className="mt-2 text-lg text-gray-600">
            Explore our hand-picked selection of premium properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <NavLink to={`/property/${property.id}`} className="hover:text-gray-950">
                    <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
                </NavLink>
                <div className="absolute top-2 right-2 bg-gray-950 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  <NavLink to={`/property/${property.id}`} className="hover:text-black">
                    {property.title}
                  </NavLink>
                </h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                <p className="text-black font-bold text-lg mb-3">{property.price}</p>
                <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <NavLink 
            to="/buy" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-950"
          >
            View All Properties
          </NavLink>
        </div>
      </div>
      {/* <Map /> */}
    </div>
  );
};

export default FeaturedProperties;