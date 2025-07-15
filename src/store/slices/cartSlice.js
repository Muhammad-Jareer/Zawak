import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from '../../api/cart';

// Initial state
const initialState = {
  items: [],
  loaded: false,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      if(!response) throw new Error();
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch cart');
    }
  }
);

// Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity = 1, price } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId._id === _id
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          productId: action.payload,
          quantity,
          price,
          total: price * quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.productId._id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) return;

      const item = state.items.find(item => item.productId._id === id);
      if (item) {
        item.quantity = quantity;
        item.total = item.quantity * item.price;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.total, 0);
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartLoaded = (state) => state.cart.loaded;
export const selectCartError = (state) => state.cart.error;

// Actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Reducer
export default cartSlice.reducer;