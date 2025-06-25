import { useDispatch } from "react-redux";
import { get_user } from "../api/auth";
import { login, logout } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRef } from "react";

export const useAuth = (componentName) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (user || hasFetched.current) {
      return;
    }
    const fetch = async () => {
      if (!user && !hasFetched.current) {
        hasFetched.current = true;
        const res = await get_user();
        if (res) {
          dispatch(login(res.user));
          return;
        } else {
          dispatch(logout());
          return;
        }
      }
    };
    fetch();
  }, []);

  return [user, isAuthenticated, loading, error];
};
