import React, { useEffect, useState } from 'react';
import useLocalStorage, { getCartContents, removeCartContents } from './useLocalStorage';
import cartEmpty from '../images/cartEmpty.png';


function Cart() {
    let orderedBooks = getCartContents();

    const [disabledButton, setdisabledButton] = useState(true);
    const [showTotalResults, setshowTotalResults] = useState(false);
    const [showCartEmpty, setshowCartEmpty] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (orderedBooks.length === 0) {
            setdisabledButton(true);
            setshowTotalResults(false);
            setshowCartEmpty(true);
        } else {
            setTotal(orderedBooks.reduce((a, v) => a = a + (v.book.price * v.count), 0).toFixed(2));
            setdisabledButton(false);
            setshowTotalResults(true);
            setshowCartEmpty(false);
        }
    }, [orderedBooks, disabledButton, showCartEmpty, showTotalResults]);

    const CleanCart = () => {
        removeCartContents('cart');
        setdisabledButton(true);
    }

    const TotalPriceOfBooks = () => (
        <div className="booksTotalPrice">
            Total Price, $ {total}
        </div>
    )

    const EmptyCart = () => (
        <div className="cartEmptyPng">
            <img className="cartEmptyPngImg" src={cartEmpty} alt="Cart empty..." />
        </div>
    )


    return (
        <main className="main">
            <div className="cartContent">
                <div className="purchase">
                    <button className="buttonSubmit fontStyle" type="submit" disabled={disabledButton} onClick={() => { CleanCart() }} >Purchase</button>
                </div>
                {showCartEmpty ? <EmptyCart/> : null}
                {orderedBooks.map(orderedBook => (
                    <div className="booksForOrder" key={orderedBook.book.id}>
                        <div className="bookNameCart">
                            <p> {orderedBook.book.title} </p>
                        </div>
                        <div className="bookCount">
                            <p>{orderedBook.count} pc.</p>
                        </div>
                        <div className="bookTotalPrice">
                            <p>{(orderedBook.count * orderedBook.book.price).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                {showTotalResults ? <TotalPriceOfBooks /> : null}
            </div>
        </main>
    );
}



export default Cart;