import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter, Router } from 'react-router-dom';

global.console.log = jest.fn();

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/Accounts Info/i);
  expect(linkElement).toBeInTheDocument();
});
