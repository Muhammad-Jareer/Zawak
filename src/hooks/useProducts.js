import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  loadMoreProducts,
  selectAllProducts,
  selectProductStatus,
  selectProductError,
  selectTotalCount,
  selectFilters,
  filterProducts,
  setFilters,
  setActiveCategory
} from "../store/slices/productSlice";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export const useProducts = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const category = params.get("category");
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const totalCount = useSelector(selectTotalCount);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const hasFetched = useRef(false);
  const prevCategory = useRef(category);

  const changeFilters = (filters) => {
    dispatch(setFilters(filters))
  }

  useEffect(() => {
    dispatch(filterProducts());
  }, [filters]);

  useEffect(() => {
    // If category changed, reset hasFetched and fetch new products
    if (category !== prevCategory.current) {
      hasFetched.current = false;
      prevCategory.current = category;
        dispatch(setActiveCategory(category));
    }

    if (status === "idle" && !hasFetched.current) {
      hasFetched.current = true;
      if (category && category !== '') {
        dispatch(setActiveCategory(category));
      }
      dispatch(fetchProducts());
    }
  }, [status, dispatch, category]);

  return {
    products,
    totalCount,
    filters,
    isLoading: status === "loading",
    isError: status === "failed",
    error,
    isSuccess: status === "succeeded",
    loadMoreProducts,
    changeFilters
  };
};