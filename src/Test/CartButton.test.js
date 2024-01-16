import { render, screen } from '@testing-library/react';
import CartButton from '../CartButton';

describe('CartButtonTest', () => {
  test('render the component', () => {
    render(<CartButton />);
    const titleElement = screen.getByText('my cart',{exact: false});
    expect(titleElement).toBeInTheDocument();
    const cartButtonElement = screen.getByRole('button');
    expect(cartButtonElement).toBeInTheDocument();
  });
});

