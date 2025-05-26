import React from 'react';
import { render, screen } from '@testing-library/react';
import Pharmacy from './Pharmacy';
//import App from './App';

test('renders learn react link', () => {
  render(<Pharmacy />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
