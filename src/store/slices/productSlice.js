import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getFilteredProducts } from "../../api/product";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const { product } = getState();
    const { visibleCount, activeCategory } = product;
    const { products, totalCount } = await getAllProducts(0, visibleCount, activeCategory);
    return { products, totalCount };
  }
);

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (_, { getState }) => {
    const { product } = getState();
    const { visibleCount, filters } = product;
    if(Object.values(filters).some(Boolean)){
      const { category, subCategory, tag, priceRange, sortBy } = filters;
          const pRange = priceRange.split("-")
      
          const res = await getFilteredProducts(
            category,
            subCategory,
            tag,
            pRange[0] || '',
            pRange[1] || '',
            sortBy,
            0,
            10
          );
      
          if(res === 'ERROR'){
            toast.error("Filtered Not Applied");
            return;
          }
      
          const {products, totalCount} = res
          return {products, totalCount};
    }
  }
);

export const loadMoreProducts = createAsyncThunk(
  "products/loadMore",
  async (_, { getState }) => {
    const { product } = getState();
    const { visibleCount, filters } = product;
    console.log("gonna load more,", visibleCount)

    // if (Object.values(filters).some(Boolean)) {
    //   const p = await getFilteredProducts({
    //     ...filters,
    //     skip: visibleCount,
    //     limit,
    //   });
    //   return {products: p};
    // }

    const p = await getAllProducts(visibleCount, 10);
    const { products, totalCount } = p;
    return { products, totalCount };
  }
);

const initialState = {
  productsList: [],
  items: [],
  totalCount: 0,
  status: "idle",
  error: null,
  filters: {
    category: "",
    subCategory: "",
    tag: "",
    priceRange: "",
    sortBy: "",
  },
  visibleCount: 10,
  recentlyViewed: [],
  activeCategory: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    addToRecentlyViewed: (state, action) => {
      const exists = state.recentlyViewed.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.recentlyViewed = [
          action.payload,
          ...state.recentlyViewed.slice(0, 3),
        ];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "done";
        state.productsList = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.visibleCount = action.payload.products.length
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.productsList = [
          ...state.productsList,
          ...action.payload.products,
        ];
        state.visibleCount += 10;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.productsList = action.payload.products
        state.totalCount = action.payload.products.length
      });
  },
});

export const { addToRecentlyViewed, setFilters, setActiveCategory } = productSlice.actions;

export const selectAllProducts = (state) => state.product.productsList;
export const selectTotalCount = (state) => state.product.totalCount;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;
export const selectRecentlyViewed = (state) => state.product.recentlyViewed;
export const selectFilters = (state) => state.product.filters;

export default productSlice.reducer;
