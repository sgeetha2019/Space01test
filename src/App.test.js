import { render, screen } from '@testing-library/react';
import Product from './pages/Product';

test('renders learn react link', () => {
  render(<Product />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
