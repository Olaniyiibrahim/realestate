import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isRental }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/property/${property.id}`} className="hover:text-black">
          <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
          {isRental ? 'For Rent' : 'For Sale'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          <Link to={`/property/${property.id}`} className="hover:text-blue-600">
            {property.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-2">{property.address}</p>
        <p className="text-blue-600 font-bold text-lg mb-3">{property.price}</p>
        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          <span>{property.sqft} sqft</span>
        </div>
        <div className="mt-4">
          <Link 
            to={`/property/${property.id}`}
            className="block w-full text-center bg-gray-950 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;