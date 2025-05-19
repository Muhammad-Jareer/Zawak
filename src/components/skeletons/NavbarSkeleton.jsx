import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Loader2 } from 'lucide-react';

const NavbarSkeleton = () => {
  const {cart, cartLoading} = useCart()
  console.log("cart loading is ", cartLoading)
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [user, isAuthenticated, loading] = useAuth("nav");

  // State to toggle mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Track visibility of navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

  // Handle scroll events
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [lastScrollY]); 

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-300 `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="w-24 h-10 bg-gray-200 animate-pulse">
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <span className='w-20 h-8 bg-gray-200 animate-pulse'>
            </span>
            <span className='w-20 h-8 bg-gray-200 animate-pulse'>
            </span>
            <span className='w-20 h-8 bg-gray-200 animate-pulse'>
            </span>
            <span className='w-20 h-8 bg-gray-200 animate-pulse'>
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <span
              className="w-8 h-8 bg-gray-200 animate-pulse"
            >
            </span>
          </div>

          {/* Desktop Icons (Hidden on small devices) */}
          <div className="hidden md:flex items-center space-x-4">
            <>
            <span to="/wishlist" className="p-2 w-8 h-8 bg-gray-200 animate-pulse">
            </span>
            <span to="/wishlist" className="p-2 w-8 h-8 bg-gray-200 animate-pulse">
            </span>
            <span to="/wishlist" className="p-2 w-8 h-8 bg-gray-200 animate-pulse">
            </span>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
