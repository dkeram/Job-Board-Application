import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useJwt } from 'react-jwt';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const { decodedToken, isExpired } = useJwt(token);
    

    const contextValue = useMemo(
        () => {
            const isAuth = !isExpired;
            const id = (decodedToken) ? decodedToken['user_id'] : null;
            const role = (decodedToken) ? decodedToken['role'] : null;
            const username = (decodedToken) ? decodedToken['name'] : null;

            return {    
                token,
                setToken,
                decodedToken,
                username,
                isExpired,
                isAuth,
                role,
                id,
            }
        },
        [token, decodedToken, isExpired]
    );

    useEffect(() => {
        localStorage.setItem('access_token', token)
    },[token]);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;