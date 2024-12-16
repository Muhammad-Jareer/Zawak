import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { products } from '../data/products';
// import FeaturedProducts from '../components/FeaturedProducts';
import SearchBar from '../components/SearchBar';
import { first_hero, second_hero, third_hero, fourth_hero, fifth_hero, sixth_hero } from '../assets/index.js';
import Product from '../components/Product.jsx';
import { useDispatch } from 'react-redux';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();

    const heroImages = [first_hero, second_hero, third_hero, fourth_hero, fifth_hero, sixth_hero];
    const totalSlides = heroImages.length;
    const featuredProducts = products.filter((prod) => prod.featured);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setSearchResults([]);
        } else {
            const filteredProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredProducts);
        }
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setActiveIndex((prev) => {
                    const newIndex = prev === null || prev === searchResults.length - 1 ? 0 : prev + 1;
                    scrollToActiveItem(newIndex);
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setActiveIndex((prev) => {
                    const newIndex = prev === null || prev === 0 ? null : prev - 1;
                    if (newIndex !== null) scrollToActiveItem(newIndex);
                    return newIndex;
                });
            } else if (e.key === 'Enter' && activeIndex !== null) {
                const selectedProduct = searchResults[activeIndex];
                if (selectedProduct) handleProductClick(selectedProduct.id);
            }
        };

        const scrollToActiveItem = (index) => {
            const activeItem = document.querySelector(`[data-index="${index}"]`);
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchResults, activeIndex]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        setQuery('');
        setActiveIndex(null);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const highlightText = (text) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="text-primary-600">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const handleAddToCart = (product) => {
        if (product && product.price) {
          dispatch({ type: "cart/addToCart", payload: { ...product, quantity: 1 } });
          setPopup({ show: true, type: "cart", itemName: product.name });
        }
      };
    
    const handleAddToWishlist = (product) => {
        if (product && product.name) {
            dispatch({ type: "wishlist/addToWishlist", payload: product });
            setPopup({ show: true, type: "wishlist", itemName: product.name });
        }
    };

    return (
        <div className="space-y-16 mt-16 font-serif">
            {/* Hero Section */}
            <section className="relative h-[600px]">
                <div className="relative h-full overflow-hidden rounded-lg">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                currentSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img src={image} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
                    <div className="relative w-full max-w-md">
                        <div className="relative">
                            <SearchBar
                                query={query}
                                onChange={handleInputChange}
                                inputRef={searchInputRef}
                            />
                            {query && (
                                <div className="absolute top-full w-full mt-1 bg-white text-gray-700 shadow-lg rounded-xl overflow-auto z-50 h-64">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((product, index) => (
                                            <div
                                                key={product.id}
                                                data-index={index} // Added for scroll targeting
                                                className={`px-4 py-2 cursor-pointer flex items-center ${
                                                    activeIndex === index ? 'bg-gray-300' : 'hover:bg-gray-100'
                                                }`}
                                                onClick={() => handleProductClick(product.id)}
                                                onMouseEnter={() => setActiveIndex(index)}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 object-cover rounded mr-4"
                                                />
                                                <div className="flex flex-col items-start">
                                                    <span>{highlightText(product.name)}</span>
                                                    <span className="text-xs">Categories: {highlightText(product.category)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="px-4 py-2 text-gray-500">No products found</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">Welcome to Our Shop</h1>
                        <p className="text-xl mb-6">Discover exclusive collections and find your perfect product!</p>
                        <Link to="/shop" className="btn btn-primary px-8 py-3 rounded-lg text-lg">
                            Shop Now
                        </Link>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Previous Slide"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/50 rounded-full group focus:outline-none"
                    onClick={prevSlide}
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white rotate-180" />
                </button>
                <button
                    type="button"
                    aria-label="Next Slide"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/50 rounded-full group focus:outline-none"
                    onClick={nextSlide}
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </button>
            </section>
            {/* <FeaturedProducts /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.slice(0, 5).map((product) => (
                    <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    enableQuickView={false}
                    />
                ))}
            </div>
            <section className="bg-accent-warm-beige py-16"></section>
        </div>
    );
}

export default Home;
