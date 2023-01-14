import React from 'react';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { makeRequest } from './Helpers';

const PublishListing = (props) => {
  const [open, setOpen] = React.useState(false);
  // const [availableFrom,] = React.useState('')
  // const [availableTo,] = React.useState('')

  const [availableDates, setAvailableDates] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
    setAvailableDates([{ start: '', end: '' }])
  }

  const handleClose = () => {
    setOpen(false);
  };

  const publishListing = async () => {
    const arrLen = availableDates.length
    if (availableDates[arrLen - 1].start >= availableDates[arrLen - 1].end) {
      alert('Please enter a valid date range!')
    } else if (availabilityListValid(availableDates)) {
      const body = {
        availability: availableDates
      }
      const data = await makeRequest('listings/publish/' + props.listingId, 'PUT', body, props.token)
      if (data.error) {
        alert(data.error)
      }
      setOpen(false)
      props.getListings()
    }
  }

  const addDate = () => {
    const valid = availabilityListValid(availableDates)
    if (valid) {
      setAvailableDates([...availableDates, { start: '', end: '' }])
    } else {
      const arrLen = availableDates.length
      availableDates[arrLen - 1].start = ''
      availableDates[arrLen - 1].end = ''
      setAvailableDates(availableDates)
    }
  }

  // Checks the date range is valid - i.e. no overlap with prev dates and start < end.
  function availabilityListValid (availabilityList) {
    const arrLen = availabilityList.length
    let valid = true
    if (arrLen >= 1) {
      if (availabilityList[arrLen - 1].start >= availabilityList[arrLen - 1].end) {
        alert('Please enter a valid date range!')
        valid = false
      } else if (arrLen > 1) {
        const newDate = availabilityList[arrLen - 1]
        let index = 0
        for (const date of availabilityList) {
          if (index !== arrLen - 1) {
            if (date.start <= newDate.end && date.end >= newDate.start) {
              alert('This date range overlaps with a previously entered range, please enter a valid range')
              valid = false
              break
            }
          }
          index += 1
        }
      }
    }
    return valid
  }

  const removeDate = (index) => {
    const list = [...availableDates]
    list.splice(index, 1)
    setAvailableDates(list)
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="success" onClick={handleClickOpen} data-cy={`publish_button-${props.listingid}`}>Publish Listing</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: 0.5 }}>
        <Button onClick={addDate} >+ Add date range</Button>
        {availableDates.map((date, i) => {
          return (
            <Stack component="form" key={i} sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }} noValidate>
              <TextField
                label="Available From"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                data-cy={`start_date-${props.listingid}`}
                value={availableDates[i].start}
                onChange={(e) => {
                  const dateList = [...availableDates]
                  const dateRange = dateList[i]
                  dateRange.start = e.target.value
                  setAvailableDates(dateList)
                }}
              />
              <TextField
                label="Available To"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                data-cy={`end_date-${props.listingid}`}
                value={availableDates[i].end}
                onChange={(e) => {
                  const dateList = [...availableDates]
                  const dateRange = dateList[i]
                  dateRange.end = e.target.value
                  setAvailableDates(dateList)
                }}
              />
              {(availableDates.length > 1) && (
                <Button size='small' color='error' onClick={() => { removeDate(i) }}>Remove</Button>
              )}

            </Stack>
          )
        })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={publishListing} data-cy={`conf_publish_button-${props.listingid}`}>Publish</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PublishListing;

PublishListing.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.number,
  getListings: PropTypes.func,
  listingid: PropTypes.number
}
