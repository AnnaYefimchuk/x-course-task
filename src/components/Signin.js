import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router';
import useLocalStorage, { setSavedValue } from './useLocalStorage';
import logo from '../images/avatar.png';

function Signin() {

    const [user, setUser] = useState(useLocalStorage('login', ''));
    const [disabledButton, setdisabledButton] = useState(true);

    const navigate = useNavigate();

    // start Check Login by spaces and length 
    function spaces(user) {
        var m = 0;
        for (var i = 0; i < user.length; i++)
            if (user.charAt(i) === ' ')
                m++;
        return m === user.length;
    }

    function CheckUsername(user) {
        setUser(user);

        if (user.length > 3 && user.length < 17) {
            setdisabledButton(false);
        } else {
            setdisabledButton(true);
        }
        if (spaces(user)) {
            setdisabledButton(true);
        }
    }
    // end Check Login by spaces and length 

    const redirectPath = "/books";

    const handleLogin = () => {
        setSavedValue("login", user);
        navigate(redirectPath);
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleLogin();
        }
    };

    return (
        <main className="main">
            <div className="loginContent">
                <div className="avatar">
                    <img src={logo} alt="avatar" />
                </div>
                <div >
                    <form action="/handling-form-page" method="post" className="inputBlock">
                        <label className="inputLogin" htmlFor="username">Username</label>
                        <input className="inputLogin" type="username" id="username" name="user_name"
                            placeholder="type Username" onChange={(e) => CheckUsername(e.target.value)} onKeyDown={handleKeypress} />

                    </form>
                </div>
                <div>
                    <button className="buttonSubmit" type="submit" disabled={disabledButton} onClick={handleLogin}>Sign-in</button>

                </div>
            </div>
        </main>
    );
};


export default Signin;