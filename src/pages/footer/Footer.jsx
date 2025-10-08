import { Link } from 'react-router-dom';
  import { FaFacebookF } from "react-icons/fa";
  import { FaSquareXTwitter } from "react-icons/fa6";
  import { FaInstagram } from "react-icons/fa";
  import { IoLogoLinkedin } from "react-icons/io5";
  import { FaMapMarkerAlt } from "react-icons/fa";
  import { FaPhoneSquareAlt } from "react-icons/fa";
  import { FaRegEnvelope } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">EstatePro</h3>
            <p className="text-gray-400">
              Helping you find your dream property since 2010. We provide exceptional service in the real estate market.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaSquareXTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <IoLogoLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/buy" className="hover:text-white transition-colors">Properties for Sale</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Rental Properties</Link></li>
              <li><Link to="/agents" className="hover:text-white transition-colors">Our Agents</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <span>123 Real Estate Ave, Suite 400<br />Miami, FL 33139</span>
              </div>
              <div className="flex items-center">
                <FaPhoneSquareAlt className="h-5 w-5 mr-3 flex-shrink-0" />
                <a href="tel:+13055551234" className="hover:text-white transition-colors">(305) 555-1234</a>
              </div>
              <div className="flex items-center">
                <FaRegEnvelope  className="h-5 w-5 mr-3 flex-shrink-0"/>
                <a href="mailto:info@estatepro.com" className="hover:text-white transition-colors">info@estatepro.com</a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest property listings and market updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} EstatePro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;