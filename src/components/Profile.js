import React from "react";
import useLocalStorage from './useLocalStorage';

export const Profile = () => {
    //const auth = useAuth();

    return (
        <main className="main">
            <div className="profilePage"> 
                <p>Hello, {useLocalStorage("login", "")}</p>
                <p>Have a good shoping! ^_^</p>
            </div>
        </main>
    )
}