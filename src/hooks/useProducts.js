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
  setFilters
} from "../store/slices/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const totalCount = useSelector(selectTotalCount);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const hasFetched = useRef(false);

  const changeFilters = (filters) => {
    dispatch(setFilters(filters))
  }

  useEffect(() => {
      dispatch(filterProducts());
  }, [filters]);

  useEffect(() => {
    if (status === "idle" && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

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
