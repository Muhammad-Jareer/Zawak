import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const AddToCartWishlistPopup = ({ type, itemName = 'Item', onClose }) => {
  // Automatically close the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  // Determine the message based on the popup type
  const actionText = type === 'cart' ? 'is added to cart!' : 'is added to wishlist!';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 fade-in-scale">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm text-center sm:w-80">
        {/* Icon */}
        <CheckCircle size={50} className="text-primary-500 mx-auto mb-4" />

        {/* Item name and message */}
        <h2 className="text-lg sm:text-base font-bold text-gray-800">{itemName}</h2>
        <p className="text-gray-600 text-sm sm:text-xs mt-2">{actionText}</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 text-sm sm:text-xs bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AddToCartWishlistPopup;
