import * as React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const CreateListingAmenities = (props) => {
  const handleChange = (e) => {
    const index = props.amenitiesList.indexOf(e.target.value)
    if (index === -1) {
      props.setAmenitiesList([...props.amenitiesList, e.target.value])
    } else {
      props.setAmenitiesList(props.amenitiesList.filter(a => a !== e.target.value))
    }
  }

  return (
    <React.Fragment>
      <Typography variant='h6'>Amenities</Typography>
      <FormGroup onChange={handleChange}>
        <span>
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Wifi')} value="Wifi" />} label="Wifi" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Kitchen')} value="Kitchen"/>} label="Kitchen" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Parking')} value="Parking"/>} label="Parking" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Pool')} value="Pool"/>} label="Pool" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Gym')} value="Gym"/>} label="Gym" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Hot Tub')} value="Hot Tub"/>} label="Hot Tub" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Fireplace')} value="Fireplace"/>} label="Fireplace" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Patio')} value="Patio"/>} label="Patio" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Games Room')} value="Games Room"/>} label="Games Room" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('TV')} value="TV"/>} label="TV" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Air Conditioning')} value="Air Conditioning"/>} label="Air Conditioning" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Washing Machine')} value="Washing Machine"/>} label="Washing Machine" />
        <FormControlLabel control={<Checkbox checked={props.amenitiesList.includes('Dryer')} value="Dryer"/>} label="Dryer" />
        </span>
      </FormGroup>
    </React.Fragment>
  )
}

export default CreateListingAmenities

CreateListingAmenities.propTypes = {
  amenitiesList: PropTypes.array,
  setAmenitiesList: PropTypes.func
}
