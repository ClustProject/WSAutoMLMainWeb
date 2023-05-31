import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/info")
      .then((response) => {
        // 유효한 권한인지 확인
        if (["USER", "MANAGER", "ADMIN"].includes(response.data.role)) {
          setAuthenticated(true);
          setUser(response.data);
        } else {
          setAuthenticated(false);
          setUser(null);
        }
      })
      .catch((error) => {
        setAuthenticated(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    authenticated,
    user,
    loading,
  };

  console.log(value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
