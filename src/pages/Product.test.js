import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react'
import Product from './Product'
import { data } from './data'
import userEvent from '@testing-library/user-event';

/*I have written 6 unit test case to check the functionality.
scenario 1.Check Prices are Numenric
scenario 2.Check 5 cheapest item
scenario 3.Check sorting order of cheapest item
scenario 4.Check Button text 'Cheapest Five Items'
scenario 5.Check Button text 'All' after click event
scenario 6.Check serch item 
*/
describe('Product', () => {
  beforeEach(() => {
    render(<Product/>)
  })
  afterEach(cleanup);

  //Check Prices are Numenric
  test('prices are numeric', () => {
    data.forEach((item) => {
      expect(typeof item.price).toBe('number');
    });
  });

  // Checking the first five cheapest price from given data. different price will fail the test case
  test('check price for the first five cheapest item', () => {
    expect(screen.getByText('125')).toBeInTheDocument();
    expect(screen.getByText('230')).toBeInTheDocument();
    expect(screen.getByText('235')).toBeInTheDocument();
    expect(screen.getByText('245')).toBeInTheDocument();
    expect(screen.getByText('295')).toBeInTheDocument();
  });

  // Checking the first five cheapest price are sorted as expected(ascending order)
  test('check sorting order of the price for the first five cheapest item', () => {
    const priceElement1 = screen.getByTestId('test-0');
    const priceElement2 = screen.getByTestId('test-1');
    const priceElement3 = screen.getByTestId('test-2');
    const priceElement4 = screen.getByTestId('test-3');
    const priceElement5 = screen.getByTestId('test-4');

    expect(priceElement1).toHaveTextContent('125');
    expect(priceElement2).toHaveTextContent('230');
    expect(priceElement3).toHaveTextContent('235');
    expect(priceElement4).toHaveTextContent('245');
    expect(priceElement5).toHaveTextContent('295');

  });

  //Check Button text 'Cheapest Five Items'
  test('check the Button text "Cheapest Five Items" while intial render', () =>{
      expect(screen.getByTestId('button')).toHaveTextContent('Cheapest Five Items');
  })

  //Check Button text 'All' after click event
  test('check the Button text "All Items" ', async () => {
    await userEvent.click(screen.getByTestId('button'));
    await waitFor(() =>  userEvent.click(screen.getByTestId('all')));
    await waitFor(() => expect(screen.getByTestId('button')).toHaveTextContent('All'));
})

//Check serch item 
test('check Filter values', () => {
  fireEvent.change(screen.getByTestId('search-input'), { target: { value: "Item B" } })
  expect(screen.getByTestId('test-Item B')).toHaveTextContent('Item B')

})

});