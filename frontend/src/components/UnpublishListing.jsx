import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeRequest } from './Helpers';

const UnpublishListing = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unpublish = async () => {
    const data = await makeRequest('listings/unpublish/' + props.listingId, 'PUT', undefined, props.token)
    if (data.error) {
      alert(data.error)
    } else {
      setOpen(false);
      props.getListings()
    }
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" data-cy={`unpublish_button-${props.listingid}`} onClick={handleClickOpen}>Unpublish Listing</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Are you sure you want to unpublish this listing?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={unpublish} data-cy={`conf_unpublish_button-${props.listingid}`}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default UnpublishListing;

UnpublishListing.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.number,
  getListings: PropTypes.func,
  listingid: PropTypes.number
}
