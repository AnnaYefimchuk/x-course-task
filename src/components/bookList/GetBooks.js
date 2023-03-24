import { useNavigate } from "react-router";
import noFoundImg from '../../images/imageNotFound.png';

export default function GetBooks(props) {

  const books = props.filteredBooks;
  const navigate = useNavigate();

  const returnNoFoundImg = (book) => {
    if (book.image) {
      return book.image;
    } else {
      return noFoundImg;
    }
  }

  const handleProceed = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="output">
      {books.map(book => (
        <div className="book" key={book.id} id={book.id}>
          <div className="bookName">
            <div className="book__summary">
              <img className="book__image" src={returnNoFoundImg(book)} alt={book.title} />
              <span className="book__title">{book.title}</span>
              <span className="book__author">{book.author}</span>
            </div>
            <div className="book__actions">
              <span className="book__price fontStyle">{book.price}</span>
              <button className="buttonHeader fontStyle" onClick={() => { handleProceed(book.id) }}>View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
