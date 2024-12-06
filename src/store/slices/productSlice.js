import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentlyViewed: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action) => {
      const exists = state.recentlyViewed.find(item => item.id === action.payload.id);
      if (!exists) {
        state.recentlyViewed = [action.payload, ...state.recentlyViewed.slice(0, 3)];
      }
    },
  },
});

export const { addToRecentlyViewed } = productSlice.actions;
export default productSlice.reducer;