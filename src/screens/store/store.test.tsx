import React from 'react';
import { render, screen } from '@testing-library/react';
import Store from './store';

test('renders learn react link', () => {
  render(<Store />);
  const linkElement = screen.getByText(/store/i);
  expect(linkElement).toBeInTheDocument();
});
