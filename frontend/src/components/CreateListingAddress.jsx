import * as React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CreateListingAddress = (props) => {
  return (
    <>
      <TextField
        type="text"
        size="small"
        label="Street"
        value={props.newListingAddress}
        data-cy={'listing_address'}
        onChange={(e) => props.setAddressList(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      {/* <TextField
        type="text"
        size="small"
        label="City"
        // value={props.newListingAddress}
        // onChange={(e) => props.setNewListingAddress(e.target.value)}
        margin="normal"
        // fullWidth
        required
      />
      <TextField
        type="text"
        size="small"
        label="Postcode"
        // value={props.newListingAddress}
        // onChange={(e) => props.setNewListingAddress(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        type="text"
        size="small"
        label="Country"
        // value={props.newListingAddress}
        // onChange={(e) => props.setNewListingAddress(e.target.value)}
        margin="normal"
        required
      /> */}
    </>
  )
}

export default CreateListingAddress

CreateListingAddress.propTypes = {
  newListingAddress: PropTypes.string,
  setAddressList: PropTypes.func,
};
