import { render, screen, fireEvent } from '@testing-library/react';
import SpecificBook from '../components/SpecificBook';
import BooksContext, {BooksProvider} from '../context/use-books';
import { Router } from 'react-router';


// describe(SpecificBook, () => {
//     it('Testing totalPrice', () => { });
//     const { getByTestId } = render(<SpecificBook />);
//     expect(getByTestId('totalPrice')).toBeTruthy();

//     it('count should increment by 1 if increment button is cliked', () => {
//          const { getByTestId, getByRole } = render(<SpecificBook />);
//          const incrementBttn = getByRole('button', { name: ' + ' });
//          fireEvent.click(incrementBttn);

//     });

//     it('count should decrement by 1 if decrement button is cliked', () => { });
// });
//jest.mock()

// jest.mock('react-router', () => ({
//     useParams: () => {id: '2'}
// }));

jest.mock("../components/SpecificBook", () => ({
    ...jest.requireActual("../components/SpecificBook"),
    getParams: jest.fn(),
   }));

//    const createWrapper = (books) => {
//     return render(<BooksProvider value={ books }>
//         <SpecificBook />
//     </BooksProvider>);
//    };

describe('Testing Button component', () => {

    // jest.mock('react-router', () => ({
    //     useParams: jest.fn().mockReturnValue({ id: '2' }),
    //   }));

    test('renders default text when text is not passed in props', () => {
        //const useParams = jest.fn(() => 2);

        // jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })
        
        const books = [{id: 2, price: 2.99}]
        // const { getByTestId } = render(<SpecificBook />);

        
        // const instance = wrapper.dive().instance();

        jest.spyOn(SpecificBook, 'getParams').mockReturnValue({ id: '2' })
        //const wrapper = createWrapper(books);
        render(
            <BooksProvider value={ books }>
                <SpecificBook />
            </BooksProvider>
        )
        expect(getByTestId('decrement')).toBeTruthy();
    })
})
