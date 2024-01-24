// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(
//     localStorage.getItem("token") || null
//   );

//   // const login = (token) => {
//   //   setAuthToken(token);
//   //   localStorage.setItem("token", token);
//   // };

//   const logout = () => {
//     setAuthToken(null);
//     localStorage.removeItem("token");
//   };

//   const isAuthenticated = () => {
//     return authToken !== null;
//   };

//   return (
//     <AuthContext.Provider value={{ authToken, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );

  useEffect(() => {
    console.log("Authentication Token:", authToken);
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
