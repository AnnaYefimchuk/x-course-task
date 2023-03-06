import React from 'react';
import { useState, useEffect, useMemo, useContext } from 'react';
import { useParams } from 'react-router';
import BooksContext from "../context/use-books";
import useLocalStorage, { addToCart } from './useLocalStorage';
import noFoundImg from './images/imageNotFound.png';

function SpecificBook() {

    const books = useContext(BooksContext);

    const { id } = useParams();

    // const { id } = this.props.match.params.id;

    let specificBook = null;

      for (const book of books) {
        if (book.id == id) {
            specificBook = book;
            break;
        }
    }

    const returnNoFoundImg = (specificBook) => {
        if (specificBook.image) {
            return specificBook.image;
        } else {
            return noFoundImg;
        }
    }

    const [inputValue, setInputValue] = useState(1);

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
        return (inputValue * specificBook.price).toFixed(2);
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
        addToCart(specificBook, inputValue);
    }

    return (
        <main className="main">
            <section className="pageStructurSpecificBook">
                <div className="bookInfo">

                    <div className="bookInfoImages">
                        <img src={returnNoFoundImg((specificBook))} alt={specificBook.title} height="380" width="310" />
                    </div>

                    <div className="bookInfoAboutBook">
                        <p><strong>Book name: </strong>{specificBook.title}</p>
                        <p><strong>Book author: </strong>{specificBook.author}</p>
                        <p><strong>Book level: </strong>Beginner</p>
                        <p><strong>Book tags: </strong>core</p>
                    </div>

                    <div className="orderInfo">
                        <table id="orderInfoMenu">
                            <tbody>
                                <tr>
                                    <td className="fontStyle">Price, $</td>
                                    <td id="price">{specificBook.price}</td>
                                </tr>

                                <tr>
                                    <td className="fontStyle">Count</td>
                                    <td>
                                        <button className="buttonCount" data-testid="decrement" disabled={inputValue <= 0} onClick={decrement}> - </button>
                                        <input type="number" className="count" value={inputValue} onChange={(e) => checkValue(e.target.value)} />
                                        <button className="buttonCount" data-testid="increment" disabled={inputValue >= 42} onClick={increment}> + </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="fontStyle">Total price</td>
                                    <td id="totalPrice" data-testid="totalPrice">{totalPrice}</td>
                                </tr>

                                <tr>
                                    <td colSpan="2"><button className="buttonAddtoCart fontStyle paddingButton" type="submit" onClick={() => { AddBookToCart() }}>Add to cart</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bookInfoDescription">
                        <p><strong>Description:</strong> {specificBook.description}
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default SpecificBook;