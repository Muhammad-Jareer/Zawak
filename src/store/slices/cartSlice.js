import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../../api/cart';

const initialState = null

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialize: (state, action) => {
      return action.payload
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => { return item.productId._id === action.payload._id});
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity based on the payload
      } else {
        const prdoductToAdd = {
          productId: action.payload,
          quantity: action.payload.quantity || 1,
          price: action.payload.price,
          total: action.payload.price
        }
        state.items.push({ ...prdoductToAdd}); // Use the payload's quantity or default to 1
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => {console.log("item is: ", item); if(item.productId._id !== action.payload) return item});
    },
    updateQuantity: (state, action) => {
      if(action.payload.quantity < 1) 
        return;

      const item = state.items.find(item => {if(item.productId._id === action.payload.id)return item });
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state, action) => {
      state.items = []
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, initialize, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
