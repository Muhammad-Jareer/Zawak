import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-16 mt-16">
        <h1 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-8">Save items you love to your wishlist!</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="font-serif text-3xl mb-8 text-primary-600">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover hover:scale-105 transition-transform"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h2 className="font-medium text-lg mb-2">{item.name}</h2>
              </Link>
              <p className="text-primary-600 font-semibold mb-4">${item.price}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 btn btn-primary"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="btn btn-outline p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;