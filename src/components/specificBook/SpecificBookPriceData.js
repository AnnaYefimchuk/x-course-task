import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useLocalStorage, { getCartContents, addToCart } from '../useLocalStorage';

function SpecificBookPriceData({ book }) {
    const LIMIT_BOOKS = 42;
    let count = 1;
    let orderedBooks = getCartContents();
    for (const object of orderedBooks) {
        if (object.book.id === book.id) {
            count = object.count;
        }
    }

    const [inputValue, setInputValue] = useState(count);
    const [info, setInfo] = useState();

    useEffect(() => {
        if (count + inputValue > LIMIT_BOOKS) {
            setInfo(`You can't order more then ${LIMIT_BOOKS} books`);
        } else {
            setInfo("")
        }
    }, [count, inputValue])
    

    const increment = () => {
        setInputValue((c) => c + 1);
    };

    const decrement = () => {
        setInputValue((c) => c - 1);
    };

    useEffect(() => {
        if (inputValue < 1) { setInputValue(1) };
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

                    {info}

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