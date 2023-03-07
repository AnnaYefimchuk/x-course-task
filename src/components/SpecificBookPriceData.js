import React from 'react';
import { useState, useEffect, useMemo, useContext } from 'react';
import useLocalStorage, { addToCart } from './useLocalStorage';

function SpecificBookPriceData({ book }) {

    const [inputValue, setInputValue] = useState(1); 1

    const increment = () => {
        setInputValue((c) => c + 1);
    };

    const decrement = () => {
        setInputValue((c) => c - 1);
    };

    useEffect(() => {
        if (inputValue < 0) { setInputValue(0) };
        if (inputValue > 42) { setInputValue(42) };
    }, [inputValue]);

    const upCalcPrice = () => {
        return (inputValue * book.price).toFixed(2);
    };

    const totalPrice = useMemo(() => upCalcPrice(inputValue), [inputValue]);

    function checkValue(newValue) {
        newValue = Math.trunc(newValue);
        if (newValue < 1) {
            newValue = 1;
        } else if (newValue > 42) {
            newValue = 42;
        }
        setInputValue(newValue);
    }

    const AddBookToCart = () => {
        addToCart(book, inputValue);
    }


    return (
        <div className="orderInfo">
            <table id="orderInfoMenu">
                <tbody>
                    <tr>
                        <td className="fontStyle">Price, $</td>
                        <td id="price">{book.price}</td>
                    </tr>

                    <tr>
                        <td className="fontStyle">Count</td>
                        <td>
                            <button className="buttonCount" disabled={inputValue <= 0} onClick={decrement}> - </button>
                            <input type="number" data-testid='input' className="count" value={inputValue} onChange={(e) => checkValue(e.target.value)} />
                            <button className="buttonCount" disabled={inputValue >= 42} onClick={increment}> + </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="fontStyle">Total price</td>
                        <td id="totalPrice"><p title="totalPrice">{totalPrice}</p></td>
                    </tr>

                    <tr>
                        <td colSpan="2"><button className="buttonAddtoCart fontStyle paddingButton" type="submit" onClick={() => { AddBookToCart() }}>Add to cart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default SpecificBookPriceData;