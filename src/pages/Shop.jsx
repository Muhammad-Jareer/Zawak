import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductModal from '../components/ProductModal';
import AddToCartWishlistPopup from '../components/AddToCartWishlistPopup';
import { ShoppingBag, Heart } from 'lucide-react';

function Shop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [visibleCount, setVisibleCount] = useState(8);
  const [modalProduct, setModalProduct] = useState(null);
  const [popup, setPopup] = useState({ show: false, type: '', itemName: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleAddToCart = (product) => {
    if (product && product.price) {
      dispatch({ type: 'cart/addToCart', payload: product });
      setPopup({ show: true, type: 'cart', itemName: product.name });
    }
  };

  const handleAddToWishlist = (product) => {
    if (product && product.name) {
      dispatch({ type: 'wishlist/addToWishlist', payload: product });
      setPopup({ show: true, type: 'wishlist', itemName: product.name });
    }
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="font-serif text-4xl text-primary-600 mb-6">Shop Our Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleCount).map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${product.id}`} className="relative group">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalProduct(product);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md"
                >
                  Quick View
                </button>
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h2 className="font-medium text-lg mb-2">{product.name}</h2>
              </Link>
              <div className="flex justify-between items-center">
                <p className="text-primary-600 font-semibold">${product.price}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ShoppingBag size={24} />
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <Heart size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(visibleCount + 8)}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Show More
          </button>
        </div>
      )}

      {popup.show && (
        <AddToCartWishlistPopup
          type={popup.type}
          itemName={popup.itemName}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}

export default Shop;
