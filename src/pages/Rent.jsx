import React, { useState } from "react";
import PropertyCard from "../pages/properties/PropertyCard";
import { rentalProperties } from "../pages/properties/propertyData";
const Rent = () => {
  const [filters, setFilters] = useState({
    bedrooms: "",
    priceRange: [0, 3000000],
    propertyType: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredProperties = rentalProperties.filter((property) => {
    return (
      (filters.bedrooms === "" ||
        property.beds === parseInt(filters.bedrooms)) &&
      (filters.propertyType === "" || property.type === filters.propertyType)
    );
  });

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
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Price: NGN{filters.priceRange[1]}
            </label>
            <input
              type="range"
              id="priceRange"
              name="priceRange"
              min="0"
              max="3000000000"
              step="100"
              className="w-full"
              onChange={(e) =>
                setFilters({ ...filters, priceRange: [0, e.target.value] })
              }
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>NGN30,000,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} isRental={true} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No properties match your current filters.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() =>
              setFilters({
                bedrooms: "",
                priceRange: [0, 5000],
                propertyType: "",
              })
            }
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Rent;
