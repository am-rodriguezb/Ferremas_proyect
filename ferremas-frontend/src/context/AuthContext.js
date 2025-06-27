// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
        user: null
    });

    const login = (token, user) => {
        localStorage.setItem('token', token);
        setAuth({ isAuthenticated: true, token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
