import React from 'react';
import { Link } from 'react-router-dom';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    price: '$2,500,000',
    location: 'Miami Beach, FL',
    beds: 5,
    baths: 4,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    price: '$1,200,000',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 3,
    title: 'Suburban Family Home',
    price: '$650,000',
    location: 'Austin, TX',
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80'
  }
];

const FeaturedProperties = () => {
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
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  <Link to={`/property/${property.id}`} className="hover:text-blue-600">
                    {property.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                <p className="text-blue-600 font-bold text-lg mb-3">{property.price}</p>
                
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
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;