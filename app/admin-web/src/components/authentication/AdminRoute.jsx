import React from "react";

import { useAuth } from "./AuthContext";
import Forbidden from "../../error/Forbidden";

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user.role === "ADMIN" ? children : <Forbidden />;
}

export default AdminRoute;
