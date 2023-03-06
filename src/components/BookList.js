import React from 'react';
import { useEffect, useState, useContext } from "react";
import GetBooks from './GetBooks';
import BooksContext from "../context/use-books";
import search from './images/pngegg.png';

function BookList() {

    const books = useContext(BooksContext);
    const [searchValue, setSearchValue] = useState("");
    const [searchValueByPrice, setSearchValueByPrice] = useState('{"min": 0, "max": 1000}');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {

        let searchValueByPriceObj = JSON.parse(searchValueByPrice);

        let filteredBooks = [];
        for (const book of books) {
            if (book.title.toLowerCase().includes(searchValue.toLowerCase()) && (book.price >= searchValueByPriceObj.min) && (book.price <= searchValueByPriceObj.max)) {
                filteredBooks.push(book);
                console.log("found " + book.title + "; searchValue = " + searchValue);
            } else {
                console.log("not found");
            }
        }
        setFilteredBooks(filteredBooks);
    }, [searchValue, searchValueByPrice]);


    function handleChange(event) {
        setSearchValueByPrice(event.target.value);
    }

    return (
        <main className="main">
            <div className="pageContent">
                <div className="searchBox">

                    <form className="searchBoxForm" action="">
                        <input type="text" placeholder="what you are looking for?" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                        <img className="imgSearch" src={search} alt="search" />

                    </form>
                </div>

                <div className="searchBoxFilter">
                    <select className="filterByPrice" value={searchValueByPrice} name="menu" onChange={handleChange}>
                        <option className="option" value='{"min": 0, "max": 1000}'>All books</option>
                        <option className="option" value='{"min": 0, "max": 15}'>from 0 to 15</option>
                        <option className="option" value='{"min": 15, "max": 30}'>from 15 to 30</option>
                        <option className="option" value='{"min": 30, "max": 1000}'>from 30 </option>
                    </select>
                </div>
            </div>
            <GetBooks filteredBooks={filteredBooks} />
        </main>
    );
}

export default BookList;