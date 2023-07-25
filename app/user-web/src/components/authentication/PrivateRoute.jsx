import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to='/loginPage' />;
}

export default PrivateRoute;
