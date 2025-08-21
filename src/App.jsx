import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyListings from './components/PropertyListings';
import FeaturedProperties from './components/FeaturedProperties';
import Footer from './components/Footer';
import PropertyDetails from './pages/PropertyDetails';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Rent from './pages/Rent';
import Buy from './pages/Buy';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Home Route with all components */}
            <Route path="/" element={
              <>
                <Hero />
                <FeaturedProperties />
                <PropertyListings />
              </>
            }>
            </Route>
            
            {/* Property Details Route */}
            <Route path="/property/:id" element={<PropertyDetails />} />
            
            {/* Rent and Buy Routes */}
            <Route path="/rent" element={<Rent />} />
            <Route path="/buy" element={<Buy />} />
            
            {/* Other Pages */}
            <Route path="/agents" element={<Agents />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* 404 Fallback Route */}
            <Route path="*" element={
              <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-6">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <a 
                  href="/" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Return to Home
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;