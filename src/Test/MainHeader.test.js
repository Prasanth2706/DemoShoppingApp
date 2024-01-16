import { screen, render } from '@testing-library/react';
import MainHeader from '../MainHeader';

describe('rendering the component', () => {
  render(<MainHeader />);

  test('test_the component title', () => {
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });
});
