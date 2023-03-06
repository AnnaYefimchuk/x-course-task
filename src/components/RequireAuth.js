import React from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage, { setSavedValue } from './useLocalStorage';
import { useEffect, useState } from "react";

export const RequireAuth = ({ children }) => {

    const [login, setlogin] = useState(useLocalStorage('login', ''));

    if (!login) {
        return <Navigate to="/signin" replace />
    }

    return children;
}