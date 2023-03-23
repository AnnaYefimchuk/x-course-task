import React from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage, { setSavedValue } from './useLocalStorage';

export const RequireAuth = ({ children }) => {

    const login = useLocalStorage('login', '');

    if (!login) {
        return <Navigate to="/signin" replace />
    }

    return children;
}