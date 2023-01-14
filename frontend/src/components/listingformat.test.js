import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import ListingFormat from './listingformat'

const props = {
  address: 'high street',
  id: 999999999,
  owner: 'Mihir',
  price: 60,
  reviews: [],
  thumbnail: 'https://www.youtube.com/watch?v=ssS-MliHsRo&ab_channel=ABC',
  title: 'Best prop'
}

const emptyProps = {
  address: '',
  id: '',
  owner: '',
  price: '',
  reviews: [],
  thumbnail: '',
  title: 'bh'
}

describe('listingFormatTesting', () => {
  it('checking for view button to exist', () => {
    render(<ListingFormat listing={props}/>);
    expect(screen.getByRole('button', { name: /view/i })).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  it('checking for title to exist', () => {
    render(<ListingFormat listing={props}/>);
    expect(screen.getByText(/high street/i)).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  it('checking for price to exist', () => {
    render(<ListingFormat listing={props}/>);
    expect(screen.getByText(/\$60/i)).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  it('submitting empty listing with no info', () => {
    render(<ListingFormat listing={emptyProps}/>);
    expect(screen.getByText(/\$/i)).toBeInTheDocument();
  });
});
