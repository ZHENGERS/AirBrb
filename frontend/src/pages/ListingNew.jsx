import * as React from 'react';
import { makeRequest } from '../components/Helpers';
import CreateListingBedrooms from '../components/CreateListingBedrooms';
import CreateListingAmenities from '../components/CreateListingAmenities';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CreateListingThumbnail from '../components/CreateListingThumbnail';
import CreateListingAddress from '../components/CreateListingAddress';

function ListingNew (props) {
  const [open, setOpen] = React.useState(false);
  const [newListingTitle, setNewListingTitle] = React.useState('');
  const [newListingAddress, setNewListingAddress] = React.useState('');
  const [newListingPrice, setNewListingPrice] = React.useState('');
  const [newListingType, setNewListingType] = React.useState('');
  const [newListingBedrooms, setNewListingBedrooms] = React.useState([{ beds: ['Single'] }]);
  const [newListingAmenities, setNewListingAmenities] = React.useState([]);
  const [newListingBathrooms, setNewListingBathrooms] = React.useState(0);
  const [newListingThumbnail, setNewListingThumbnail] = React.useState('');

  const resetForm = () => {
    setNewListingTitle('')
    setNewListingAddress('')
    setNewListingPrice('')
    setNewListingType('')
    setNewListingBedrooms([{ beds: ['Single'] }])
    setNewListingAmenities([])
    setNewListingBathrooms(0)
    setNewListingThumbnail('')
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm()
  };

  const newListing = async () => {
    const body = {
      title: newListingTitle,
      address: newListingAddress,
      price: parseInt(newListingPrice),
      thumbnail: newListingThumbnail,
      metadata: {
        type: newListingType,
        bedrooms: newListingBedrooms,
        amenities: newListingAmenities,
        bathrooms: newListingBathrooms
      },
    }
    if (body.title === '' || body.title === '' || body.thumbnail === '' || body.price === '' || body.metadata.type === '') {
      alert('Enter required fields')
    } else if (isNaN(body.price)) {
      alert('Price must be a number!')
    } else {
      const data = await makeRequest('listings/new', 'POST', body, props.token)
      if (data.error) {
        alert(data.error);
      } else {
        setOpen(false);
        resetForm();
        props.getListings();
        alert('listing created!!')
      }
    }
  }

  function incrementCount () {
    setNewListingBathrooms(newListingBathrooms + 1);
  }
  function decrementCount () {
    if (newListingBathrooms !== 0) {
      setNewListingBathrooms(newListingBathrooms - 1);
    }
  }

  return (
    <div>
      <Button variant="outlined" name="create_listing" onClick={handleClickOpen}>
      Create New Listing
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography component="h1" variant="h5">
            Create New Listing
          </Typography>
          <form>
            <TextField
              type="text"
              size="small"
              label="Listing Title"
              data-cy={'listing_title'}
              value={newListingTitle}
              onChange={(e) => setNewListingTitle(e.target.value)}
              margin="normal"
              fullWidth
              required
            />

            <CreateListingAddress bedroomList={newListingAddress} setAddressList={setNewListingAddress}/>

            <TextField
              type="text"
              size="small"
              label="Price/Night ($)"
              data-cy={'listing_price'}
              value={newListingPrice}
              onChange={(e) => setNewListingPrice(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Property Type
            </InputLabel>
            <Select
              value={newListingType}
              data-cy={'sel_property_type'}
              onChange={(e) => { setNewListingType(e.target.value) }}
            >
              <MenuItem value={'House'} data-cy={'property_type1'}>House</MenuItem>
              <MenuItem value={'Apartment'} data-cy={'property_type2'}>Apartment</MenuItem>
              <MenuItem value={'Townhouse'} data-cy={'property_type3'}>Townhouse</MenuItem>
              <MenuItem value={'Terrace'} data-cy={'property_type4'}>Terrace</MenuItem>
            </Select>
            <span> Bathrooms: {newListingBathrooms} </span>
            <button onClick={decrementCount}>-</button><button onClick={incrementCount}>+</button>
            <hr></hr>
            <CreateListingBedrooms bedroomList={newListingBedrooms} setBedroomList={setNewListingBedrooms}/>
            <hr></hr>
            <CreateListingAmenities amenitiesList={newListingAmenities} setAmenitiesList={setNewListingAmenities}/>
            <hr></hr>
            <CreateListingThumbnail thumbnail={newListingThumbnail} setThumbnail={setNewListingThumbnail} />
            <br></br>
            <Button
              variant='contained'
              type='submit'
              data-cy={'submit_listing'}
              onClick={newListing}>
              Create Listing
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListingNew

ListingNew.propTypes = {
  token: PropTypes.string,
  getListings: PropTypes.func,
};
