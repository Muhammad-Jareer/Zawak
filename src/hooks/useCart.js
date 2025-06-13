import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { initialize, removeFromCart } from "../store/slices/cartSlice";
import { addItemToCart, getCart, removeItemFromCart } from "../api/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const [addingItemToCart, setAddingItemToCart] = useState(false);
  const [removingFromCart, setRemoveFromCart] = useState(null);
  const [error, setError] = useState(null);

  const handleAddToCart = async (product) => {
    if (product && product.price) {
      setAddingItemToCart(true);
      try {
        const res = await addItemToCart(product);
        if (res === 401) return navigate("/login");
        if (res) {
          dispatch({
            type: "cart/addToCart",
            payload: { ...product, quantity: 1 },
          });
          toast.success("Item Added Successfully");
        }
      } catch (err) {
        toast.error("Failed to add item to cart");
      } finally {
        setAddingItemToCart(false);
      }
    }
  };

  const handleRemoveItem = async (id) => {
    setRemoveFromCart(id);
    try {
      const res = await removeItemFromCart(id);
      if (res) dispatch(removeFromCart(id));
    } catch (err) {
      toast.error("Failed to remove item from cart");
    } finally {
      setRemoveFromCart(null);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {

      if(!cart && !hasFetched.current){
      hasFetched.current = true;
      try {
        const fCart = await getCart();
        if (fCart) dispatch(initialize({ ...fCart }));
      } catch (err) {
        setError(err.message || "Failed to fetch cart");
      } 
    };
  }

    fetchCart();
  }, [dispatch]);

  return {
    cart,
    cartLoading: !cart,
    error,
    handleAddToCart,
    addingItemToCart,
    handleRemoveItem,
    removingFromCart,
  };
};
