import { fireEvent, screen, render } from '@testing-library/react';
import Cart from '../Cart';
import productStore from '../ApiStore';

productStore.cartstore = [];
describe('Cart', () => {
  test('render the component', () => {
    render(<Cart />);
  });

  test('test_closeButton_', () => {
    const togglePopUp = jest.fn();
    render(<Cart togglePopUp={togglePopUp} />);
    expect(
      screen.getByText('your shopping Cart', { exact: false })
    ).toBeInTheDocument();

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(togglePopUp).toHaveBeenCalledTimes(1);
  });

  test('it displays a message when the cart is empty', () => {
    const togglePopUp = jest.fn();
    render(<Cart togglePopUp={togglePopUp} />);
    expect(screen.getByText('Empty Cart')).toBeInTheDocument();
  });

  test('it displays our cart items and handles interactions', () => {
    productStore.cartstore = [
      { name: 'Item 1', image: 'Item1.png', rate: 10 },
      { name: 'Item 2', image: 'Item2.png', rate: 13 },
    ];

    const togglePopUp = jest.fn();
    render(<Cart togglePopUp={togglePopUp} />);

    const CartItemsNames = productStore.cartstore.map((item) => item.name);
    CartItemsNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const increaseButtons = screen.getAllByText('+');
    const decreaseButtons = screen.getAllByText('-');
    const deleteButtons = screen.getAllByTestId('delete-button');

    increaseButtons.forEach((button) => fireEvent.click(button));
    decreaseButtons.forEach((button) => fireEvent.click(button));
    deleteButtons.forEach((button) => fireEvent.click(button));
  });
});
