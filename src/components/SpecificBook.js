import React from 'react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BooksContext from "../context/use-books";
import noFoundImg from '../images/imageNotFound.png';
import SpecificBookPriceData from './SpecificBookPriceData'

function SpecificBook() {

    const books = useContext(BooksContext);

    const { id } = useParams();

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

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'})
    })

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

                    <SpecificBookPriceData book={specificBook} />

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