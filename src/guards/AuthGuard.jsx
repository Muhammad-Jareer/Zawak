import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const [isOk, setIsOk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const authStatus = await isAuthenticated();
      console.log(authStatus);
      setIsOk(authStatus);
      if (!authStatus) {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 min-h-screen w-full flex items-center justify-center gap-4 -translate-y-24">
        <Loader />
        <h2 className="text-3xl text-primary-700 font-bold">
          ZAWAK IS LOADING
        </h2>
      </div>
    );
  }

  return isOk ? children : null;
}

export default AuthGuard;

// I think new auth check from db is more ok then useAuth
