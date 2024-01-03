import React, { createContext, useContext, useMemo, useState } from "react";
import { useJwt } from "react-jwt";


const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    // State to hold the authentication token
    const [token, setToken] = useState(localStorage.getItem("access_token"));

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
        setToken,
        }),
        [token]
    );


  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;