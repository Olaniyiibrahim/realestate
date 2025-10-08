// src/components/Hero.js
// import React, { useState } from 'react';
const Hero = () => {
  
  
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Modern home"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Home
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Discover the perfect property that matches your lifestyle and budget. Browse thousands of listings with photos, videos, and virtual tours.
        </p>
        <div className="mt-10 bg-white p-4 rounded-lg max-w-md">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <select id="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              name="propertyType"
              // className="w-full px-4 py-2 border border-gray-300 rounded-md"
              // onChange={handleFilterChange}
              // value={filters.propertyType}
              >
                <option>All Locations</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Houston</option>
              </select>
            </div>
            {/* <div className="flex-1">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select id="type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" 
              // id="propertyType"
              name="propertyType"
              // className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleFilterChange}
              value={filters.propertyType}
              >
                <option>All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Land</option>
              </select>
            </div> */}
          </div>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Search Properties 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;