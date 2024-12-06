import React, { useState } from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import AddToCartWishlistPopup from '../components/AddToCartWishlistPopup';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [popupInfo, setPopupInfo] = useState(null); // State to manage popup visibility and type

  if (!product) return null;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleAddToCart = () => {
    // Simulate adding to cart
    setPopupInfo({ type: 'cart', itemName: product.name });
  };

  const handleAddToWishlist = () => {
    // Simulate adding to wishlist
    setPopupInfo({ type: 'wishlist', itemName: product.name });
  };

  const closePopup = () => setPopupInfo(null);

  return (
    <>
      <div
        id="modal-overlay"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover mb-4 rounded"
          />

          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            <p className="text-gray-500 text-sm">Base Price: ${product.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="btn btn-outline flex-1 flex items-center justify-center"
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Render the popup if popupInfo is set */}
      {popupInfo && (
        <AddToCartWishlistPopup
          type={popupInfo.type}
          itemName={popupInfo.itemName}
          onClose={closePopup}
        />
      )}
    </>
  );
};

export default ProductModal;
