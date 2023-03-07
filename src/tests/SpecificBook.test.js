import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpecificBookPriceData from '../components/SpecificBookPriceData';

const book = {
    "id": 7,
    "author": "Saleem Siddiqui",
    "price": 36.99,
}

const setup = () => {
    const utils = render(<SpecificBookPriceData book={book} />)
    const displayValue = screen.getByTitle('totalPrice')
    const input = screen.getByTestId('input')
    return {
        input,
        displayValue,
        ...utils,
    }
}

test("check input param", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1' } })
    expect(input.value).toBe('1')
});

test("increment button is clicked and the value increments by 1", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1' } });
    userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(input.value).toBe("2");
});

test("decrement button is clicked and the value decrements by 1", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '2' } });
    userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(input.value).toBe("1");
});

test("total price after clicked decrements button by 1", () => {
    const { utils } = setup();
    const displayValue = screen.getByTitle('totalPrice');
    userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(displayValue.textContent).toBe("73.98");
});

test("total price after clicked increments button by 1", () => {
    const { utils } = setup();
    const displayValue = screen.getByTitle('totalPrice');
    userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(displayValue.textContent).toBe("0.00");
});

test("total price after update input param to 7", () => {
    const { displayValue } = setup();
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 7 } });
    expect(input.value).toBe("7");
    expect(displayValue).toHaveTextContent('258.93');
});