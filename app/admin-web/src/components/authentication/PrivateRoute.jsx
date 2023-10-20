import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Forbidden from "../../error/Forbidden";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Forbidden />;
}

export default PrivateRoute;
