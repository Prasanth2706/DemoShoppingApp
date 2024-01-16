import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import productStore from '../ApiStore';

jest.mock('../ApiStore', () => ({
  title: [],
  handleCount: jest.fn(),
  cartstore: [],
}));

describe('Card Component', () => {
  beforeEach(() => {
    productStore.title = [
      {
        title: 'Product 1',
        category: 'Category 1',
        image: 'image1.jpg',
        price: 20,
        rating: {
          rate: 4.5,
          count: 100,
        },
      },
    ];
  });

  test('renders product data', () => {
    render(<Card />);
    const productTitle = screen.getByText('Product 1');
    expect(productTitle).toBeInTheDocument();
  });

  test('toggles like button', () => {
    render(<Card />);
    const likeButton = screen.getByTestId('like-cards');
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('red');
    fireEvent.click(likeButton);
    expect(likeButton).not.toHaveClass('red');
  });

  test('adds product to cart', () => {
    render(<Card />);
    const addToCartButton = screen.getByText('Add to Cart.');
    fireEvent.click(addToCartButton);
    expect(productStore.handleCount).toHaveBeenCalled();
    expect(productStore.cartstore.length).toBe(1);
  });

  
});
