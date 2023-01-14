import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateListingThumbnail from './CreateListingThumbnail';
import { render, screen } from '@testing-library/react';
import { Grid, TextField } from '@mui/material';

// Testing
Enzyme.configure({ adapter: new Adapter() });
describe('CreateListingThumbnail', () => {
  it('Upload thumbnail text to inform user', () => {
    render(<CreateListingThumbnail/>);
    expect(screen.getByText(/Upload Thumbnail/i)).toBeInTheDocument();
  });
  it('Upload thumbnail options extend to video and picture', () => {
    const result = shallow(<CreateListingThumbnail/>);
    expect(result.find(TextField)).toHaveLength(2);
  });
  it('Upload thumbnail options extend to video and picture', () => {
    const result = shallow(<CreateListingThumbnail/>);
    expect(result.find(TextField)).toHaveLength(2);
  });
  it('Upload thumbnail options extend to video and picture', () => {
    const result = shallow(<CreateListingThumbnail/>);
    expect(result.find(TextField)).toHaveLength(2);
  });
  it('Have a grid for photo and video upload', () => {
    const result = shallow(<CreateListingThumbnail/>);
    expect(result.find(Grid)).toHaveLength(1);
  });
});
