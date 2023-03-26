/* Signin part */

export function getSavedValue(key, initialValue) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
        return savedValue;
    } else {
        return initialValue;
    }
}

export function setSavedValue(key, value) {
    localStorage.setItem(key, value);
}

export function removeSavedValue(key) {
    localStorage.removeItem(key);
}

export default function useLocalStorage(key, initialValue) {
    return getSavedValue(key, initialValue);
}

/* Cart part */

export function addToCart(book, count) {
    const CartContents = localStorage.getItem('cart');
    const MAX_COUNT_ORDERED_BOOK = 42;
    if (CartContents) {
        let objectContents = JSON.parse(CartContents);
        for (const object of objectContents) {
            if (object.book.id == book.id) {
                object.count += count;
                if (object.count > MAX_COUNT_ORDERED_BOOK) {
                    object.count = MAX_COUNT_ORDERED_BOOK;
                }
                localStorage.setItem('cart', JSON.stringify(objectContents));
                return;
            }
        }
        let item = { key: book.id, book: book, count: count };
        objectContents.push(item);
        localStorage.setItem('cart', JSON.stringify(objectContents));
    } else {
        localStorage.setItem('cart', JSON.stringify([{ key: book.id, book: book, count: count }]));
    }
}

export function getCartContents() {
    let contents = localStorage.getItem('cart');
    if (contents) {
        return JSON.parse(contents);
    } else {
        return [];
    }
}


export function removeCartContents(key) {
    localStorage.removeItem(key);
}
