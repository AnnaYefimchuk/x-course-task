import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useLocalStorage, { removeSavedValue, getCartContents } from '../useLocalStorage';
import Cartsvg from '../../images/cart.svg';
import Avatar from '../../images/avatar.png';
import './header.css';

function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {
        removeSavedValue("login");
        navigate('/signin');
    }

    function CountOrderedBooks() {
        let orderedBooks = getCartContents();
        let countOrderedBooks = 0;

        for (const orderedBook of orderedBooks) {
            if (orderedBook.count) {
                countOrderedBooks += orderedBook.count;
            }
        }
        return countOrderedBooks;
    }

    const login = useLocalStorage('login', '');

    function HeaderMenu() {
        return (
            <ul>
                <li>
                    <Link to="/cart" className="conteiner"><img src={Cartsvg} alt="Cart" height="45" width="45"></img>
                        <div className="cartIndicator">{CountOrderedBooks()}</div>
                    </Link>
                </li>
                <li>
                    <button className="buttonHeader fontStyle" type="submit" onClick={handleLogout}>Sign-out</button>
                </li>
                <li>
                    <Link to="/username"><img src={Avatar} alt="Avatar" height="45" width="45"></img></Link>
                </li>
                <li>
                    <Link to="/username">{useLocalStorage("login", "Guest")}</Link>
                </li>
            </ul>);
    }


    return (
        <>
            <header className="headerStyle">
                <nav className="nav">
                    <Link to="/books" className="siteTitle">JS BAND STORE / Anna Yefimchuk</Link>
                    {!login ? null : HeaderMenu()}
                </nav>
            </header>
            <Outlet />
        </>
    );
}

export default Header;