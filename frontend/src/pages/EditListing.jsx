import React from 'react';
import { makeRequest } from '../components/Helpers';
import CreateListingBedrooms from '../components/CreateListingBedrooms';
import CreateListingThumbnail from '../components/CreateListingThumbnail';
import CreateListingAmenities from '../components/CreateListingAmenities';
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EditListing = () => {
  const params = useParams()
  const history = useHistory()

  const [editedTitle, setEditedTitle] = React.useState('');
  const [editedAddress, setEditedAddress] = React.useState('');
  const [editedPrice, setEditedPrice] = React.useState('');
  const [editedType, setEditedType] = React.useState('');
  const [editedBedrooms, setEditedBedrooms] = React.useState([{ beds: ['Single'] }]);
  const [editedAmenities, setEditedAmenities] = React.useState([]);
  const [editedBathrooms, setEditedBathrooms] = React.useState(0);
  const [editedThumbnail, setEditedThumbnail] = React.useState('');

  const getListing = async () => {
    const data = await makeRequest('listings/' + params.id, 'GET', undefined, undefined);
    setEditedTitle(data.listing.title)
    setEditedAddress(data.listing.address)
    setEditedPrice(data.listing.price)
    setEditedType(data.listing.metadata.type)
    setEditedBedrooms(data.listing.metadata.bedrooms)
    setEditedAmenities(data.listing.metadata.amenities)
    setEditedBathrooms(data.listing.metadata.bathrooms)
    setEditedThumbnail(data.listing.thumbnail)
  }

  function incrementCount () {
    setEditedBathrooms(editedBathrooms + 1);
  }
  function decrementCount () {
    if (editedBathrooms !== 0) {
      setEditedBathrooms(editedBathrooms - 1);
    }
  }

  const handleEdit = async () => {
    const body = {
      title: editedTitle,
      address: editedAddress,
      price: parseInt(editedPrice),
      thumbnail: editedThumbnail,
      metadata: {
        type: editedType,
        bedrooms: editedBedrooms,
        amenities: editedAmenities,
        bathrooms: editedBathrooms
      },
    }
    if (isNaN(body.price)) {
      alert('Price must be a number!')
    } else {
      const data = await makeRequest('listings/' + params.id, 'PUT', body, localStorage.getItem('token'))
      if (data.error) {
        alert(data.error);
      } else {
        history.push('/hosted')
      }
    }
  }

  React.useEffect(() => {
    getListing();
  }, []);

  return (
    <>
      <Container component="main" sx={{ marginBottom: '64px' }}>
          <CssBaseline />
          <br></br>
          <Typography variant='h4'>
            Edit Listing
          </Typography>
          <br></br>
          <InputLabel>Title</InputLabel>
          <TextField
              type="text"
              id='title'
              size="small"
              value={editedTitle}
              data-cy={'edit_listing_title'}
              onChange={(e) => setEditedTitle(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <InputLabel>Address</InputLabel>
            <TextField
              type="text"
              size="small"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <InputLabel>Price/Night ($)</InputLabel>
            <TextField
              type="text"
              size="small"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Property Type
            </InputLabel>
            <Select
              value={editedType}
              onChange={(e) => { setEditedType(e.target.value) }}
            >
              <MenuItem value={'House'}>House</MenuItem>
              <MenuItem value={'Apartment'}>Apartment</MenuItem>
              <MenuItem value={'Townhouse'}>Townhouse</MenuItem>
              <MenuItem value={'Terrace'}>Terrace</MenuItem>
            </Select>
            <span> Bathrooms: {editedBathrooms} </span>
            <button onClick={decrementCount}>-</button><button onClick={incrementCount}>+</button>
            <hr></hr>
            <CreateListingBedrooms bedroomList={editedBedrooms} setBedroomList={setEditedBedrooms}/>
            <hr></hr>
            <CreateListingAmenities amenitiesList={editedAmenities} setAmenitiesList={setEditedAmenities}/>
            <hr></hr>
            <CreateListingThumbnail thumbnail={editedThumbnail} setThumbnail={setEditedThumbnail} />
            <br></br>
            <Button onClick={() => { history.push('/hosted') } }>Back</Button>
            <Button
              variant='contained'
              type='submit'
              onClick={handleEdit}
              data-cy={'save_changes_but'}
            >
              Save Changes
            </Button>
          </Container>
    </>
  )
}

export default EditListing
