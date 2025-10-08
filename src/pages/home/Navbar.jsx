// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import useUserType from '../../Utilities/hooks/useUserType';
import { supabase } from '../../lib/supabase';
import { usePaystackPayment } from '../../Utilities/usePayment';
import SecurePaymentPage from '../auth/PayMe';

const Navbar = () => {
  // Check localStorage to persist payment status across page reloads
  const [paymentSuccess, setPaymentSuccess] = useState(
    localStorage.getItem('hasAccessPayment') === 'true'
  );
  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { user, loading, isAgent } = useUserType();

  useEffect(() => {
    const checkUserPayment = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: payments } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'successful')
          .limit(1);
        
        if (payments && payments.length > 0) {
          setPaymentSuccess(true);
          localStorage.setItem('hasAccessPayment', 'true');
        } else {
          setPaymentSuccess(false);
          localStorage.removeItem('hasAccessPayment');
        }
      }
    };

    if (user) {
      checkUserPayment();
    }
  }, [user]); // Run when user changes
  
  const handleSignOut = async () => {
    let {data:{error}  } = await supabase.auth.signOut();
    // Clear payment access on sign out
    localStorage.removeItem('hasAccessPayment');
    setPaymentSuccess(false);
  };

  if (loading) return <div>Loading...</div>;

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const getLinkClasses = (path) => {
    const baseClasses = "block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    const inactiveClasses = "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";
    const activeClasses = "bg-blue-50 border-b border-blue-500 text-blue-700";

    return `${baseClasses} ${activeLink === path ? activeClasses : inactiveClasses}`;
  };

  // const handleAccessClick = () => {
  //   if (!paymentSuccess && user) {
  //     setShowPaymentModal(true);
  //   }
  // };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink to="/" className="text-xl font-bold text-blue-600">
                  EstatePro
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
                
                {/* Show navigation only if user is logged in AND has made payment */}
                {user && paymentSuccess && (
                  <>
                    <NavLink
                      to="/buy"
                      className={getLinkClasses("/buy")}
                      onClick={() => handleLinkClick("/buy")}
                    >
                      Buy
                    </NavLink>
                    <NavLink
                      to="/rent"
                      className={getLinkClasses("/rent")}
                      onClick={() => handleLinkClick("/rent")}
                    >
                      Rent
                    </NavLink>
                    {isAgent && (
                      <NavLink
                        to="/agents"
                        className={getLinkClasses("/agents")}
                        onClick={() => handleLinkClick("/agents")}
                      >
                        Agents
                      </NavLink>
                    )}
                    <NavLink
                      to="/contact"
                      className={getLinkClasses("/contact")}
                      onClick={() => handleLinkClick("/contact")}
                    >
                      Contact
                    </NavLink>
                    {isAgent && (
                      <NavLink
                        to="/upload-property" 
                        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Property
                      </NavLink>
                    )}
                  </>
                )}
              </div>
            </div>

            {!user ? (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/signin">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 my-3 rounded-md text-sm font-medium">
                    Sign In
                  </button>
                </NavLink>
              </div>
            ) : (
              <div className="hidden  md:flex items-center sm:ml-6 sm:flex sm:space-x-8">
                <span className="text-gray-700 mr-4">
                  Welcome, {isAgent ?  `Agnt ${user.user_metadata?.agency_name}`  : user.user_metadata?.name || user.email}
                </span>
                <button 
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - similar logic */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={getLinkClasses("/")}
                onClick={() => handleLinkClick("/")}
              >
                Home
              </NavLink>
              
              {user && paymentSuccess && (
                <>
                  <NavLink
                    to="/buy"
                    className={getLinkClasses("/buy")}
                    onClick={() => handleLinkClick("/buy")}
                  >
                    Buy
                  </NavLink>
                  <NavLink
                    to="/rent"
                    className={getLinkClasses("/rent")}
                    onClick={() => handleLinkClick("/rent")}
                  >
                    Rent
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={getLinkClasses("/contact")}
                    onClick={() => handleLinkClick("/contact")}
                  >
                    Contact
                  </NavLink>
                </>
              )}

              {!user ? (
              <div className="sm:ml-6 sm:flex sm:items-center">
                <NavLink to="/signin">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Sign In
                  </button>
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">
                  Welcome, {user.user_metadata?.name || user.email}
                </span>
                <button 
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
            </div>
        </div>
        )}
</nav>
</>
)
}
export default Navbar;