/* eslint react/prop-types: 0 */
/* eslint no-sequences: 0 */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import BedIcon from '@mui/icons-material/Bed';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import SortList from './SortList'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

// search bar for filtering listings
export default function SearchAppBar (props) {
  const [rating, setRating] = React.useState('');
  const [Date, setDate] = React.useState([null, null]);
  const [openn, setOpen] = React.useState(false);
  const [NoBedrooms, setNoBedrooms] = React.useState(0);
  const [minPrice, setminPrice] = React.useState('');
  const [maxPrice, setmaxPrice] = React.useState('');
  const [searchstring, setsearchstring] = React.useState('');
  const [searchbutclicked, setbuttonclicked] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = e => {
    setRating(e.target.value);
  };
  const [fullfilterdata, setfullfilterdata] = React.useState({});

  const filterresults = async () => {
    if (minPrice >= maxPrice) {
      alert('Min price should be less than Max price!')
    }
  }

  const makedict = async () => {
    setfullfilterdata({
      rating,
      date: Date,
      bed_num: NoBedrooms,
      minPrice,
      maxPrice,
      search_string: searchstring,
      searchbut: searchbutclicked
    })
  }

  const setbutton = async () => {
    console.log(searchbutclicked);
    await makedict();
    setbuttonclicked(true);
  }

  const renderHomepage = async () => {
    await makedict();

    // history.push({
    //   pathname: '/',
    //   state: {  // location state
    //     prop: fullfilterdata,
    //   },
    // });
    setOpen(false);
    // navigate.push(
    //   {'/', {state:fullfilterdata}})
  }

  const resetfunc = () => {
    setRating('');
    setDate([null, null]);
    setNoBedrooms(0);
    setminPrice('');
    setmaxPrice('');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
            sx={{ mr: 2 }}
          >
            <FilterAltIcon></FilterAltIcon>
          </IconButton>
          <Modal
            open={openn}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Filter Options:
              </Typography>
              <hr />
              <Box sx={{ width: 1 }}>
                <Typography variant="subtitle1">
                  Bedrooms:
                </Typography>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <BedIcon></BedIcon>
                  <Slider
                    aria-label="Number of bedrooms"
                    valueLabelDisplay="auto"
                    value={NoBedrooms}
                    onChange={(e) => setNoBedrooms(e.target.value)}
                    step={1}
                    marks
                    min={0}
                    max={20}
                  />
                </Stack>
                <Typography variant="subtitle1">
                  Date Range:
                </Typography>
                <br />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  localeText={{ start: 'Check-in', end: 'Check-out' }}
                >
                  <DateRangePicker
                    value={Date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
                <br />
                <Typography variant="subtitle1">
                  Price Range:
                </Typography>
                <br />
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <TextField id="outlined-basic" label="Min Price" variant="outlined" value={minPrice} onChange={(e) => setminPrice(e.target.value)}/>
                  <TextField id="outlined-basic" label="Max Price" variant="outlined" value={maxPrice} onChange={(e) => setmaxPrice(e.target.value)}/>
                </Stack>
                <br />
                <Typography variant="subtitle1">
                  Ratings:
                </Typography>
                <br />
                <FormControl fullWidth>
                  <InputLabel id="rating_order">Rating</InputLabel>
                  <Select
                    labelId="rating_order"
                    id="rating_id"
                    value={rating}
                    label="Rating"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Lowest'}>Lowest to Highest</MenuItem>
                    <MenuItem value={'Highest'}>Highest to Lowest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <br />
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={resetfunc}>Reset</Button>
                <Button variant="outlined" onClick={filterresults, renderHomepage}>Save and Close</Button>
              </Stack>
            </Box>
          </Modal>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setsearchstring(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button variant="contained" endIcon={<SearchIcon />} onClick={setbutton} sx={{ marginLeft: '10%' }}>
            Search
          </Button>
          {searchbutclicked && <SortList token = {props.token} filterdata = {fullfilterdata} setfilteredpub = {props.setfilteredpub} setfilteredbook={props.setfilteredbook} setsearch={setbuttonclicked}/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
