import { createContext } from "react";

const BooksContext = createContext();
export const BooksProvider = BooksContext.Provider;

export default BooksContext;