import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyDetailsData } from "./propertyData"
import Map from '../../components/Map'; 
const PropertyDetails = () => {
  const { id } = useParams();
   const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one page in history
    // OR navigate('/specific-path') to go to a specific route
  };
  
  // Find the specific property by ID
  const property = propertyDetailsData.find(prop => prop.id === parseInt(id));
  
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
          <p className="mt-2 text-gray-600">The property you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block text-gray-800 hover:text-gray-950">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <div className="flex items-center">
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only ">Home</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link to=".." className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700" onClick={handleGoBack}>Properties</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-500">{property.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.address}</p>
        <p className="text-2xl font-bold text-blue-600 mt-4">{property.price}</p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <img 
            src={property.images[0]} 
            alt="Main property view" 
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1, 3).map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Property view ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
          <div className="relative">
            <img 
              src={property.images[3]} 
              alt="Property view 4"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
              <button className="text-white font-medium px-4 py-2 bg-blue-600 rounded-md">
                View All Photos
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Property Details */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Bedrooms</p>
                <p className="font-medium">{property.beds}</p>
              </div>
              <div>
                <p className="text-gray-500">Bathrooms</p>
                <p className="font-medium">{property.baths}</p>
              </div>
              <div>
                <p className="text-gray-500">Square Feet</p>
                <p className="font-medium">{property.sqft}</p>
              </div>
              <div>
                <p className="text-gray-500">Year Built</p>
                <p className="font-medium">{property.yearBuilt}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <Map />
          </div>
        </div>

        {/* Right Column - Contact Agent */}
        <div>
          <div className="bg-white shadow rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h2>
            <div className="flex items-center mb-6">
              <img 
                src={property.agent.image} 
                alt={property.agent.name}
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-medium">{property.agent.name}</p>
                <p className="text-gray-600">Listing Agent</p>
              </div>
            </div>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-950 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
              >
                Contact Agent
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">or call directly</p>
              <p className="text-gray-950 font-medium">{property.agent.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyDetails;