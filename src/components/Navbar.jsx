// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    const inactiveClasses = "border-transparent text-gray-500 hover:bg-gray-50hover :border-gray-300 hover:text-gray-700";
    const activeClasses = "bg-blue-50 border-b border-blue-500 text-blue-700";

    return `${baseClasses} ${activeLink === path ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="text-xl font-bold text-blue-600">
                RealEstate
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={getLinkClasses("/")}
                onClick={() => handleLinkClick("/")}
              >
                Home
              </NavLink>
              <Link
                to="/buy"
                className={getLinkClasses("/buy")}
                onClick={() => handleLinkClick("/buy")}
              >
                Buy
              </Link>
              <NavLink
                to="/rent"
                className={getLinkClasses("/rent")}
                onClick={() => handleLinkClick("/rent")}
              >
                Rent
              </NavLink>
              <NavLink
                to="/agents"
                className={getLinkClasses("/agents")}
                onClick={() => handleLinkClick("/agents")}
              >
                Agents
              </NavLink>
              <NavLink
                to="/contact"
                className={getLinkClasses("/contact")}
                onClick={() => handleLinkClick("/contact")}
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={getLinkClasses("/")}
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Link>
              <Link
                to="/buy"
                className={getLinkClasses("/buy")}
                onClick={() => handleLinkClick("/buy")}
              >
                Buy
              </Link>
              <Link
                to="/rent"
                className={getLinkClasses("/rent")}
                onClick={() => handleLinkClick("/rent")}
              >
                Rent
              </Link>
              <Link
                to="/agents"
                className={getLinkClasses("/agents")}
                onClick={() => handleLinkClick("/agents")}
              >
                Agents
              </Link>
              <Link
                to="/contact"
                className={getLinkClasses("/contact")}
                onClick={() => handleLinkClick("/contact")}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <button className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;