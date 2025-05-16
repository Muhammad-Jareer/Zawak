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
      console.log("payload tiemto add is: ", action.payload)
      const existingItem = state.items.find(item => { return item.productId._id === action.payload._id});
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity based on the payload
        console.log("donene")
      } else {
        const prdoductToAdd = {
          productId: action.payload,
          quantity: action.payload.quantity || 1,
          price: action.payload.price,
          total: action.payload.price
        }
        state.items.push({ ...prdoductToAdd}); // Use the payload's quantity or default to 1
        console.log("moneee")
      }
    },
    removeFromCart: (state, action) => {
      console.log("remove payload is: ", action.payload)
      state.items = state.items.filter(item => {console.log("item is: ", item); if(item.productId._id !== action.payload) return item});
    },
    updateQuantity: (state, action) => {
      if(action.payload.quantity < 1) 
        return;
      
      console.log("update payload is: ", action.payload)
      const item = state.items.find(item => {console.log("item is: ", item); if(item.productId._id === action.payload.id)return item });
      console.log("item is: ", item)
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
