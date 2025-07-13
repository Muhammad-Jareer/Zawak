import { useDispatch } from "react-redux";
import { get_user } from "../api/auth";
import { login, logout } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useRef } from "react";

export const useAuth = (componentName) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const abortController = useRef(null);

  const fetchUser = useCallback(async () => {
    if (!user && !hasFetched.current) {
      hasFetched.current = true;
      
      // Create abort controller for cleanup
      abortController.current = new AbortController();
      
      try {
        const res = await get_user();
        if (res ) {
          dispatch(login(res.user));
        } 
      } catch (err) {
          setError(err.message);
          dispatch(logout());
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchUser();
    
    // Cleanup function
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fetchUser]);

  return [user, isAuthenticated, loading, error];
};
