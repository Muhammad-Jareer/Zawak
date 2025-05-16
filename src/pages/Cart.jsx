import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity, initialize } from '../store/slices/cartSlice';
import { api_updateQuantity, getCart, removeItemFromCart } from '../api/cart';
import { useCart } from '../hooks/useCart';

function Cart() {
  const dispatch = useDispatch();
  const {cart} = useCart();

  useEffect(() => {
          window.scrollTo(0, 0);
  }, [cart]);  

  const handleUpdateQuantity = (id, operation, quantity) => {
    const res = api_updateQuantity(id, operation)
    if(res)
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = async (id) => {
    const res = await removeItemFromCart(id)
    if(res)
     dispatch(removeFromCart(id));
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-16 mt-16">
        <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some beautiful items to your cart!</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 md:px-4 mt-16">
      <h1 className="font-serif text-3xl mb-8 text-primary-600">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart && cart.items && cart?.items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-4 flex items-center">
              <img
                src={item?.productId?.image}
                alt={item?.productId?.name}
                className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-sm sm:text-base">{item?.productId.name}</h3>
                <p className="text-primary-600">${item?.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item?.productId._id, 'decrement', item?.quantity - 1)}
                  className="p-1 rounded-md border"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item?.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item?.productId._id, 'increment', item?.quantity + 1)}
                  className="p-1 rounded-md border"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemoveItem(item?.productId._id)}
                  className="p-1 rounded-md text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="font-medium text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(cart.items.reduce((sum, item) => sum + item.price, 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(cart.items.reduce((sum, item) => sum + item.price, 0)).toFixed(2)}</span>
            </div>
          </div>
          <Link to="/place-order-cart" className="w-full btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
