import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';

function Categories() {
  // Generate unique categories based on product data
  const categories = [...new Set(products.map(product => product.category))];
  
  // Get the current category from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category'); // Get selected category from the URL

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <h1 className="font-serif text-4xl text-center mb-12 text-primary-600">Browse Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {categories.map((category, index) => {
          // Get the first product image for this category
          const categoryImage = products.find(product => product.category === category)?.image;

          // Check if the current category is selected
          const isActive = selectedCategory === category;

          return (
            <Link
              key={index}
              to={`/shop?category=${encodeURIComponent(category)}`} // Ensure encoding
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${isActive ? 'border-4 border-primary-600' : ''}`}
            >
              <div className="w-full h-64 relative">
                {/* Use the first image of the product in the category */}
                <img
                  src={categoryImage || '/images/default-category.jpg'} // Fallback if no image is found
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
                <h2 className="font-serif text-2xl mb-2">{category}</h2>
                <p className="text-gray-200 text-sm">{`Explore ${category} products`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
