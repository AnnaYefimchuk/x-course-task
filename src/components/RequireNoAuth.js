import React from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage from './useLocalStorage';

export const RequireNoAuth = ({ children }) => {

    const login = useLocalStorage('login', '');

    if (login) {
        return <Navigate to="/books" replace />
    }

    return children;
}