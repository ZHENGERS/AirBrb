import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, TextField, Modal, Box, Stack, Button } from '@mui/material';
import { fileToDataUrl } from './Helpers';

// creates thumbnail whether video or picture
const CreateListingThumbnail = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 0,
  };
  //  for modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  for picture existence

  const [ispicture, setispicture] = React.useState(false);
  const [pictureData, setpictureData] = React.useState('');

  const handlePicture = async (e) => {
    setpictureData(await fileToDataUrl(e.target.files[0]))
    handleOpen();
  }

  const clickedyes = () => {
    console.log(pictureData)
    props.setThumbnail(pictureData);
    setispicture(true);
    handleClose();
  }

  const clickedno = () => {
    setpictureData('');
    handleClose();
  }

  const handleVideo = async (e) => {
    if (!e.target.value.startsWith('https')) {
      alert('url should start with https')
    }
    if (!ispicture) {
      props.setThumbnail(e.target.value)
    }
  }

  return (
    <React.Fragment>
      <Typography variant='h6'>Upload Thumbnail</Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Alert
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You can either upload a picture or a video. Continue with picture?
        </Typography>
        <br />
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Button variant="contained" color="success" onClick={clickedyes}>
              Yes
            </Button>
            <Button variant="outlined" color="error" onClick={clickedno}>
              No
            </Button>
        </Stack>
        </Box>
      </Modal>
      <Grid item xs={12}>
      <TextField
        margin='normal'
        id='thumbnail'
        name='thumbnail'
        fullWidth
        autoComplete='Thumbnail'
        variant='standard'
        type='file'
        onChange={handlePicture}
      />
      {!ispicture && <TextField
        data-cy={'video_field'}
        margin='normal'
        id='video'
        name='video'
        label='video'
        fullWidth
        autoComplete='Video'
        variant='standard'
        onChange={handleVideo}
      />}
    </Grid>
      {/* <input type="file" onChange={handleChange} required></input>
      <Card>
        <img src={props.thumbnail} width='95%' />
      </Card> */}
    </React.Fragment>
  )
}

export default CreateListingThumbnail

CreateListingThumbnail.propTypes = {
  thumbnail: PropTypes.string,
  setThumbnail: PropTypes.func
}
