import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-primary-600 mb-4">ZAWAK</h3>
            <p className="text-gray-600 text-lg">
              Celebrating women's craftsmanship and empowering artisans worldwide.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">FAQ</Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Connect With Us</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2024 ZAWAK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
