import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import Footer from './components/Footer';
import Header from './components/Header';
import Signin from './components/Signin';
import SpecificBook from './components/SpecificBook';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Error404 from './components/Error404';
import { Profile } from './components/Profile';
import { RequireAuth } from './components/RequireAuth';
import { RequireNoAuth } from './components/RequireNoAuth';
import BooksContext, { BooksProvider } from "./context/use-books";
import GetBooks from './components/GetBooks';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/d0acf79a-f735-4bd8-987b-f74bfe069ad7")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.books);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded) {
    return;
  }
  else {
    <GetBooks />
  }

  return (
    <div className='app'>
      < Routes >
        <Route path="/" element={<Header />}>
          <Route index element={<RequireNoAuth><Signin /></RequireNoAuth>} />
          <Route path="signin" element={<RequireNoAuth><Signin /></RequireNoAuth>} />
          <Route path="cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="username" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="books/:id" element={<RequireAuth><BooksProvider value={items}><SpecificBook /></BooksProvider></RequireAuth>} />
          <Route path="*" element={<Error404 />} />
          <Route path="books" element={<RequireAuth><BooksProvider value={items}><BookList /></BooksProvider> </RequireAuth>} />
        </Route>
      </Routes >
      <Footer />
    </div>
  );
}

export default App;
