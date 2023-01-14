import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

const CreateListingBedrooms = (props) => {
  const addBedroom = () => {
    props.setBedroomList([...props.bedroomList, { beds: ['Single'] }]);
  };

  const removeBedroom = (index) => {
    const list = [...props.bedroomList]
    list.splice(index, 1)
    props.setBedroomList(list)
  }

  const addBed = (index) => {
    const list = [...props.bedroomList];
    list[index].beds.push('Single')
    props.setBedroomList(list)
  }

  const removeBed = (bedroom, bed) => {
    const list = [...props.bedroomList]
    list[bedroom].beds.splice(bed, 1)
    console.log(list)
    props.setBedroomList(list)
  }

  return (
    <div>
      {props.bedroomList.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <Card variant="outlined">
              <Typography component="h6" variant="h6">
                Bedroom {i + 1}
              </Typography>
              <Button color='error' onClick={ removeBedroom }>&#8722; Remove Bedroom</Button>
              <Button onClick={() => { addBed(i) }}>Add Bed</Button>
              {item.beds.map((bed, id) => {
                return (
                  <React.Fragment key={id}>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Bed Type
                      </InputLabel>
                      <Select
                        value={props.bedroomList[i].beds[id]}
                        onChange={(e) => {
                          const list = [...props.bedroomList]
                          const bedList = list[i]
                          bedList.beds[id] = e.target.value
                          props.setBedroomList(list)
                          console.log(props.bedroomList)
                        }}
                      >
                        <MenuItem value={'King'}>King</MenuItem>
                        <MenuItem value={'Queen'}>Queen</MenuItem>
                        <MenuItem value={'Double'}>Double</MenuItem>
                        <MenuItem value={'King Single'}>King Single</MenuItem>
                        <MenuItem value={'Single'}>Single</MenuItem>
                      </Select>
                      <Button variant='filled' onClick={() => { removeBed(i, id) }}>Remove Bed</Button>
                  </React.Fragment>
                )
              })}
            </Card>
            <br></br>
          </React.Fragment>
        );
      })}
      <Button variant='outlined' onClick={addBedroom}>+ Add Bedroom</Button>
    </div>
  );
}

export default CreateListingBedrooms

CreateListingBedrooms.propTypes = {
  bedroomList: PropTypes.array,
  setBedroomList: PropTypes.func,
};
