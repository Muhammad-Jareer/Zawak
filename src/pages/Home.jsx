import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import first_hero from '../assets/hero1.avif';
import second_hero from '../assets/hero2.jpg';
import third_hero from '../assets/hero3.jpg';
import fourth_hero from '../assets/hero4.jpg';
import fifth_hero from '../assets/hero5.jpg';
import sixth_hero from '../assets/hero6.jpg';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [first_hero, second_hero, third_hero, fourth_hero, fifth_hero, sixth_hero];
  const totalSlides = heroImages.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

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
              <div className="relative w-full h-full">
                <img src={image} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Shop</h1>
            <p className="text-xl mb-6">
              Discover exclusive collections and find your perfect product!
            </p>
            <Link to="/shop" className="btn btn-primary px-8 py-3 rounded-lg text-lg">
              Shop Now
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/50 rounded-full group focus:outline-none"
          onClick={prevSlide}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white rotate-180" />
        </button>
        <button
          type="button"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/50 rounded-full group focus:outline-none"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentSlide === index ? 'bg-white' : 'bg-gray-500'
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl mb-8 text-primary-600">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-primary-600 font-semibold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/shop" className="btn btn-outline inline-flex items-center">
            View All Products
            <ChevronRight className="ml-2 w-4 h-4 text-primary-600" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-accent-warm-beige py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6 text-primary-600 tracking-tight">
              Our Story
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              We believe in empowering women artisans by providing a platform to showcase their
              exceptional craftsmanship. Each piece tells a unique story of tradition, creativity,
              and dedication—woven with passion and resilience.
            </p>
            <Link
              to="/about"
              className="btn btn-primary transform transition-all hover:scale-105 hover:shadow-lg px-8 py-3 rounded-lg text-lg"
            >
              Learn More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
