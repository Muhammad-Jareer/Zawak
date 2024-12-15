import React from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
  // Filter the products to get only those with `featured: true`
  const featuredProducts = products.filter((prod) => prod.featured);

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl mb-8 text-primary-600">Featured Products</h2>
      <div className="relative overflow-hidden">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="inline-block mx-4 group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105 flex flex-col w-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-primary-600 font-semibold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
          {/* Duplicate items for seamless scrolling */}
          {featuredProducts.map((product) => (
            <Link
              key={`dup-${product.id}`}
              to={`/product/${product.id}`}
              className="inline-block mx-4 group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105 flex flex-col w-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-primary-600 font-semibold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
