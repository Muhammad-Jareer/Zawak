import { useDispatch } from "react-redux";
import { get_user } from "../api/auth";
import { login, logout } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAuth = (componentName) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  console.log("useAuth hook is called", componentName);

  useEffect(() => {
    if (user) {
      return;
    }
    const fetch = async () => {
      if (!user) {
        console.log("Fetching user ...", componentName);
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
