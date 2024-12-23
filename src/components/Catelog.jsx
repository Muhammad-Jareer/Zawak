import React from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

function Catelog() {
    const categoryNames = [...new Set(products.filter(prod => prod.category).map(prod => prod.category))];

    return (
        <div>
            <h1 className='text-xl md:text-3xl font-bold mt-8 text-primary-600'>Explore Our Categories</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8'>
                {categoryNames.map((category, idx) => (
                    <div 
                        key={idx} 
                        className='bg-white shadow-lg p-4 flex flex-col'
                    >
                        {/* Category Title */}
                        <h2 className='text-lg font-bold mb-4 text-primary-600'>{category}</h2>

                        {/* Product Images with Sub-category */}
                        <div className='grid grid-cols-2 gap-2 mb-4'>
                            {products
                                .filter(prod => prod.category === category)
                                .slice(0, 6) // Limit to 6 products
                                .map((product) => (
                                    <div 
                                        key={product.id} 
                                        className='hover:scale-105 transition-transform duration-300 text-center'
                                    >
                                        <Link to={`/product/${product.id}`}>
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className='w-full h-24 object-cover mb-2 hover:cursor-pointer'
                                            />
                                        </Link>
                                        {/* Sub-category Text */}
                                        <p className='text-xs text-gray-600 text-left'>{product.sub_category || 'N/A'}</p>
                                    </div>
                                ))}
                        </div>

                        {/* See More Link */}
                        <Link to='/shop' className='text-blue-500 text-sm mt-auto'>
                            See more
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catelog;
