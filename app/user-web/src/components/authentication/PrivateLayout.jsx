import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateLayout = () => {
  const { authenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authenticated && !loading) {
      navigate("/login", { state: { from: location } });
    }
  }, [authenticated, loading, navigate, location]);

  return !loading && authenticated ? <Outlet /> : null;
};

export default PrivateLayout;
