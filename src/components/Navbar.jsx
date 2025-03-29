import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';
import { get_user } from '../api/auth';
import { login, logout } from '../store/slices/authSlice';

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  // State to toggle mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Track visibility of navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const user = useSelector(state => state.auth.user)

   useEffect(() => {
      console.log("user in header is: ", user)
      if(user) return
      const getUser = async () => {
        const user = await get_user();
        if(!user){
          console.log('ererojeifjal')
          dispatch(logout())
          return;
        }
        dispatch(login(user.user))
      }
      getUser()
    }, [user])

  // Handle scroll events
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // User is scrolling down, hide navbar
      setIsVisible(false);
    } else {
      // User is scrolling up, show navbar
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY); // Update scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
    };
  }, [lastScrollY]); // Re-run when the scroll position changes

  // Function to close the mobile menu when a link is clicked
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl text-primary-600 flex items-center justify-center">
            <img src={Logo} className="w-16 h-16" alt="Logo" />
            <span className="-ml-2">AWAK</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/shop" 
             className={({ isActive }) =>
              isActive
                ? "text-primary-700 transition-colors"
                : "text-gray-600 hover:text-primary-600 transition-colors"
            }
            >
              Shop
            </NavLink >
            <NavLink  to="/categories" 
             className={({ isActive }) =>
              isActive
                ? "text-primary-700 transition-colors"
                : "text-gray-600 hover:text-primary-600 transition-colors"
            }
            >
              Categories
            </NavLink >
            <NavLink  to="/about" 
             className={({ isActive }) =>
              isActive
                ? "text-primary-700 transition-colors"
                : "text-gray-600 hover:text-primary-600 transition-colors"
            }
            >
              About
            </NavLink >
            <NavLink  to="/contact" 
             className={({ isActive }) =>
              isActive
                ? "text-primary-700 transition-colors"
                : "text-gray-600 hover:text-primary-600 transition-colors"
            }
            >
              Contact
            </NavLink >
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-600 p-2"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Icons (Hidden on small devices) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (<><Link to="/wishlist" className="p-2 hover:text-primary-600 transition-colors relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:text-primary-600 transition-colors relative">
              <ShoppingBag size={20} />
              {cart && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <Link to="/profile" className="p-2 hover:text-primary-600 transition-colors">
              <User size={20} />
            </Link></>) : 
            (
              <Link to="/login" className='text-gray-600 hover:text-primary-600 transition-colors border border-primary-600 px-3 py-1 rounded-full'>Login</Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links (shown when menu is open) */}
        <div
          className={`md:hidden flex flex-col items-center space-y-4 mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <Link to="/shop" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Shop
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Categories
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Contact
          </Link>

          {/* Mobile Links Without Icons (Only Names) */}
          {user ? (<><Link to="/wishlist" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 text-xs bg-primary-600 text-white rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Cart
            {cart && cart.items.length > 0 && (
              <span className="ml-2 text-xs bg-primary-600 text-white rounded-full px-2">
                {cart.items.length}
              </span>
            )}
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors" onClick={closeMobileMenu}>
            Profile
          </Link> </>) : 
            (
              <Link to="/login" className='text-gray-600 hover:text-primary-600 transition-colors border border-primary-600 px-3 py-1 rounded-full'>Login</Link>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
