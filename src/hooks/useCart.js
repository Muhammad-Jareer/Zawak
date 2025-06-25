import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { 
  addToCart, 
  removeFromCart,
  fetchCart,
  clearCart,
  selectCartTotal
} from "../store/slices/cartSlice";
import { addItemToCart, removeItemFromCart } from "../api/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removingFromCart, setRemovingFromCart] = useState('')
  const [addingItemToCart, setAddingItemToCart] = useState('')
  
  // Select cart state from Redux
  const cart = useSelector(state => state.cart);
  const { items, loading, loaded, error } = cart;

  const cartTotal = useSelector(selectCartTotal)

  const handleAddToCart = async (product) => {
    if (!product?.price) {
      toast.error("Invalid product");
      return;
    }

    try {
      setAddingItemToCart(product._id);
      const res = await addItemToCart(product);
      
      if (res === 401) {
        navigate("/login");
        return;
      }

      if (res) {
        dispatch(addToCart({ 
          ...product, 
          quantity: 1 
        }));
        toast.success("Item added to cart");
      }
    } catch (err) {
      toast.error(err.message || "Failed to add item to cart");
    } finally {
      setAddingItemToCart('');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setRemovingFromCart(productId);
      const res = await removeItemFromCart(productId);
      
      if (res) {
        dispatch(removeFromCart(productId));
        toast.success("Item removed from cart");
      }
    } catch (err) {
      toast.error(err.message || "Failed to remove item from cart");
    } finally {
      setRemovingFromCart('');
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  // Initialize cart if not loaded
  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(fetchCart());
    }
  }, [dispatch, loaded, loading]);

  return {
    items,
    cartTotal,
    isLoading: loading,
    isLoaded: loaded,
    error,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveItem,
    clearCart: handleClearCart,
    isEmpty: items.length === 0,
    removingFromCart,
    addingItemToCart
  };
};