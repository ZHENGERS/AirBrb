import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeRequest } from './Helpers';

const DeleteListing = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteListing = async () => {
    const data = await makeRequest('listings/' + props.listingId, 'DELETE', undefined, props.token)
    if (data.error) {
      alert(data.error)
    } else {
      setOpen(false);
      props.getListings()
    }
  }

  return (
    <React.Fragment>
      <Button color="error" onClick={handleClickOpen}>Delete Listing</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Are you sure you want to delete this listing?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteListing}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteListing;

DeleteListing.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.number,
  getListings: PropTypes.func
}
