import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  initialize,
} from '../store/slices/cartSlice';
import { getCart } from '../api/cart';

export const useCart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("useCart hook is called");

  // Fetch cart once
  useEffect(() => {
      const fetchCart = async () => {
          if (hasFetched.current) return;
          
          try {
        console.log("Fetching cart ..."); 
        setCartLoading(true);
        hasFetched.current = true;
        const cart = await getCart();
        console.log("Fetched cart: ", cart);
        if(cart)
          dispatch(initialize({...cart}));
      } catch (err) {
        setError(err.message || 'Failed to fetch cart');
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [cart, dispatch]);

  return {
    cart,
    cartLoading,
    error
  };
};
