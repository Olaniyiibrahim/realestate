import { Link } from "react-router-dom";
import { featuredProperties } from "./propertyData";

const PropertyListings = () => {
  const displayProperties = featuredProperties.filter(
    (property) => property.id > 3
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Latest Properties</h2>
        <button className="text-gray-600 hover:text-gray-800 font-medium">
          View All Properties
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <Link
                to={`/property/${property.id}`}
                className="hover:text-blue-600"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={property.image}
                  alt={property.title}
                />
                {property.featured && (
                  <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </Link>
              <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 hover:text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link
                    to={`/property/${property.id}`}
                    className="hover:text-gray-800"
                  >
                    {property.title}
                  </Link>
                </h3>
                <p className="text-lg font-bold text-blue-600">
                  {property.price}
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-1">{property.address}</p>
              <div className="flex mt-4 text-sm text-gray-500">
                <div className="flex items-center mr-4">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  {property.beds} beds
                </div>
                <div className="flex items-center mr-4">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {property.baths} baths
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    ></path>
                  </svg>
                  {property.sqft} sqft
                </div>
              </div>
              <Link
                to={`/property/${property.id}`}
                className="hover:text-blue-600"
              >
                <button className="mt-4 w-full  bg-gray-950 hover:bg-gray-800 text-white py-2 px-4 rounded-md">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
