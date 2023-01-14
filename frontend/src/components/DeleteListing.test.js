import DeleteListing from './DeleteListing';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { shallow, configure } from 'enzyme';

// const props = {
//   listingId: '00000000'
// }

// const props2 = {
//   listingId: ''
// }

describe('<DeleteListing>', () => {
  it('should render a modal button', () => {
    render(<DeleteListing />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

  it('should open modal dialog with two buttons on button click', () => {
    render(<DeleteListing />);
    fireEvent.click(screen.getByText(/Delete Listing/i))
    expect(screen.getByText('Are you sure you want to delete this listing?')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  })

  it('should close modal on button click', () => {
    render(<DeleteListing />);
    fireEvent.click(screen.getByText(/Delete Listing/i))
    expect(screen.getByText('Are you sure you want to delete this listing?')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/No/i))
    // expect(screen.getByRole('button')).toBeInTheDocument();
  })
});
