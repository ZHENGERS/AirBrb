import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeRequest } from '../components/Helpers';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import { Rating, Container, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import Popover from '@mui/material/Popover';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: '20rem',
  borderRadius: 5,
  marginBottom: '3rem',
  marginLeft: '1rem',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const ViewFullListing = (props) => {
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const commonStyles = {
    bgcolor: 'white',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '90%',
    height: '10rem',
    textAlign: 'center',
    flexWrap: 'wrap'
  };

  function getLabelText (value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const params = useParams()
  const history = useHistory()
  // for modal 1
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // for modal 2
  const [openreview, setOpenreview] = React.useState(false);
  const handleOpenReview = () => setOpenreview(true);
  const handleCloseReview = () => setOpenreview(false);

  // for review
  const [reviewValue, setValueReview] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  // for review values
  const [reviewText, setreviewText] = React.useState('');
  const [bookingId, setBookingId] = React.useState(0);

  // review stats
  const [reviewStats, setreviewStats] = React.useState([]);
  const [whichratingnow, setwhichratingnow] = React.useState('');
  const [whichratingnowcoll, setwhichratingnowcoll] = React.useState([]);

  // review stat modal
  const [openreviewstat, setOpenreviewstat] = React.useState(false);
  const handleOpenReviewStat = () => setOpenreviewstat(true);
  const handleCloseReviewStat = () => setOpenreviewstat(false);

  const [listing, setListing] = React.useState('')
  const [availability, setAvailability] = React.useState([])
  const [bathrooms, setBathrooms] = React.useState([])
  const [bedrooms, setBedrooms] = React.useState([])
  const [amenities, setAmenities] = React.useState([])
  const [isbooked, setIsBooked] = React.useState(false)
  const [allReview, setallReview] = React.useState([])
  const [allReviewnum, setallReviewnum] = React.useState(0)
  const [fetchedReview, setallfetchedReview] = React.useState([])

  // for hover
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [bookingDates, setBookingDates] = React.useState({ start: '', end: '' })

  const resetstuff = async () => {
    setallfetchedReview([]);
    setallReviewnum(0);
    setallReview([]);
    setIsBooked(false);
    setAmenities([]);
    setBedrooms([]);
    setBathrooms([]);
    setAvailability([]);
    setListing('');
    setwhichratingnowcoll([]);
    setwhichratingnow('');
    setreviewStats([]);
    setBookingId(0);
    setreviewText('');
    setValueReview(2);
  }

  const getListing = async () => {
    await resetstuff();
    const data = await makeRequest('listings/' + params.id, 'GET', undefined, undefined);
    setListing(data.listing)
    setAvailability(data.listing.availability)
    setAmenities(data.listing.metadata.amenities)
    setBathrooms(data.listing.metadata.bathrooms)
    setBedrooms(data.listing.metadata.bedrooms)
    // console.log(data.listing)
    let addition = 0
    for (const reviewnum of data.listing.reviews) {
      addition += reviewnum.stars;
      setallfetchedReview(current => [...current, reviewnum])
      setallReview(current => [...current, reviewnum.stars]);
    }

    setallReviewnum(addition);
  }

  const bookListing = async () => {
    const bookingStart = new Date(bookingDates.start)
    const bookingEnd = new Date(bookingDates.end)
    if (bookingStart > bookingEnd) {
      alert('Please enter valid booking dates')
      handleClose()
      return
    } else {
      for (const dateRange of availability) {
        const dateRangeStart = new Date(dateRange.start)
        const dateRangeEnd = new Date(dateRange.end)
        console.log(`${bookingStart} to ${bookingEnd}`)
        console.log(`${dateRangeStart} to ${dateRangeEnd}`)

        if (bookingStart >= dateRangeStart && bookingEnd <= dateRangeEnd) {
          const bookingD = { start: bookingDates.start, end: bookingDates.end }
          const bookingDays = (bookingEnd - bookingStart) / (1000 * 60 * 60 * 24)
          const price = bookingDays * listing.price
          console.log(price)
          console.log(bookingD)
          const body = {
            dateRange: bookingD,
            totalPrice: price
          }
          const data = await makeRequest('bookings/new/' + params.id, 'POST', body, localStorage.getItem('token'))
          if (data.error) {
            alert(data.error)
          } else {
            alert(`Booking request confirmed! Your booking id is ${data.bookingId}`)
          }
          handleClose()
          return
        }
      }
    }
    // Didnt break out of loop therefore date wasnt within the list of available dates
    alert('Please enter valid booking dates within the list of available dates')
    handleClose()
  }

  React.useEffect(() => {
    getListing();
  }, [])

  React.useEffect(() => {
    calcdetailedstats();
  }, [allReview])

  // React.useEffect(() => {
  //   getListing();
  // }, [openreview])

  const getNumBeds = () => {
    let numBeds = 0
    for (const room of bedrooms) {
      numBeds += room.beds.length
    }
    return numBeds
  }

  const isbookedcheck = () => {
    const dataOne = makeRequest('bookings', 'GET', undefined, localStorage.getItem('token'));
    dataOne.then((data) => {
      if (data.bookings.length > 0) {
        for (const booking of data.bookings) {
          if (booking.owner === localStorage.getItem('user')) {
            if (booking.listingId === params.id) {
              if (booking.status === 'accepted') {
                setBookingId(booking.id);
                setIsBooked(true);
              }
            }
          }
        }
      }
    });
  }

  isbookedcheck();

  const percentageCalc = (firstVal, secVal) => {
    return (100 * firstVal) / secVal;
  }

  const calcaverage = async () => {
    const data = await makeRequest('listings', 'GET', undefined, props.token);
    let sum = 0;
    let length = 0;
    let avg = 0;
    for (const listings of data.listings) {
      for (const rating of listings.reviews) {
        sum += rating.stars;
        length += 1;
      }
    }
    avg = sum / length;
    return avg;
  }

  const calcdetailedstats = () => {
    const stats = [];
    let oneStar = 0;
    let twoStar = 0;
    let thirdStar = 0;
    let fourStar = 0;
    let fiveStar = 0;
    const sumAll = allReview.length;
    for (const review of fetchedReview) {
      if (review.stars === 0.5 || review.stars === 1) {
        oneStar += 1;
      } else if (review.stars === 1.5 || review.stars === 2) {
        twoStar += 1;
      } else if (review.stars === 2.5 || review.stars === 3) {
        thirdStar += 1;
      } else if (review.stars === 3.5 || review.stars === 4) {
        fourStar += 1;
      } else if (review.stars === 4.5 || review.stars === 5) {
        fiveStar += 1;
      }
    }
    stats.push({ perc: percentageCalc(oneStar, sumAll), star: 'one', tot: oneStar });
    stats.push({ perc: percentageCalc(twoStar, sumAll), star: 'two', tot: twoStar });
    stats.push({ perc: percentageCalc(thirdStar, sumAll), star: 'three', tot: thirdStar });
    stats.push({ perc: percentageCalc(fourStar, sumAll), star: 'four', tot: fourStar });
    stats.push({ perc: percentageCalc(fiveStar, sumAll), star: 'five', tot: fiveStar });

    setreviewStats(stats);
  }

  const addreview = async () => {
    const avg = await calcaverage();
    const data = {
      review: { stars: reviewValue, reviewtxt: reviewText, avg }
    }
    const dataOne = await makeRequest('listings/' + params.id + '/review/' + bookingId, 'PUT', data, localStorage.getItem('token'));
    if (dataOne.error) {
      alert(dataOne.error);
    } else {
      alert('review successfully added!!')
    }
    handleCloseReview();
  }

  const renderrating = (rating) => {
    setwhichratingnow(rating);
    handleOpenReviewStat();
    let num = 0;
    if (rating === 'one') {
      num = 1;
    } else if (rating === 'two') {
      num = 2;
    } else if (rating === 'three') {
      num = 3;
    } else if (rating === 'four') {
      num = 4;
    } else if (rating === 'five') {
      num = 5;
    }
    const ratingwise = [];
    for (const ratings of fetchedReview) {
      console.log(ratings)
      if (ratings.stars === num - 0.5 || ratings.stars === num) {
        ratingwise.push(ratings)
      }
    }
    setwhichratingnowcoll(ratingwise);
  }

  // const averagefuncreview = () => {
  //   let sum = 0
  //   for (const reviewnum of reviewsum) {
  //     sum += reviewnum
  //   }
  //   console.log(sum)
  //   console.log(reviewsum.length)
  //   console.log(reviewsum)
  //   return sum;
  // }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
          >
          <ArrowBackIcon onClick={() => {
            history.push('/')
          }}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Airbrb
          </Typography>
          </Toolbar>
      </AppBar>
      </Box>
      <Container component="main" sx={{ marginBottom: '64px' }}>
        <Typography variant="h4" component="h2" align='center' mt={2}>
            {listing.title}
        </Typography>
        <Box align='center'>
          Average Rating ({allReviewnum / allReview.length} stars)
        </Box>
        <Box onMouseOver={handleMouseOver}>
          <Rating name="read-only" value={allReviewnum / allReview.length} readOnly/>
        </Box>
        {/* onMouseLeave= {handleMouseOut} aria-owns={isHovering ? 'mouse-over-popover' : undefined} */}
        <Popover
          id="mouse-over-popover"
          open={isHovering}
          anchorEl={isHovering}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleMouseOut}
          disableRestoreFocus
        >
          <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
              Review Statistics
          </Typography>
          {
            reviewStats.map((review, id) => (
              <React.Fragment key={id}>
                <Stack spacing={4} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <Typography variant="h6" component="h2" align='left' mt={2} ml={2} mb={2}>
                      {review.star} star:
                  </Typography>
                  <BorderLinearProgress variant="determinate" value={review.perc}/>
                  <Typography variant="h6" component="h2" align='left' mt={2} ml={2} mb={2}>
                      {review.perc}% ({review.tot} total review(s))
                  </Typography>
                  <Button variant="outlined" color="success" value={review.star} onClick={(e) => renderrating(e.target.value)}>
                    View More
                  </Button>
                </Stack>
              </React.Fragment>
            ))
          }
          <Button variant="outlined" color="success" onClick={handleMouseOut}>
            Close
          </Button>
        </Popover>
        <Modal
            open={openreviewstat}
            onClose={handleCloseReviewStat}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {whichratingnow} star reviews:
            </Typography>
            <br />
            {whichratingnowcoll.map((review, key) => (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={key}>
                <Box sx={{ ...commonStyles, borderRadius: '16px', alignItems: 'center' }}>
                  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems='center'>
                    <Rating name="read-only" value={review.stars} readOnly/>
                    <Typography variant="h6" component="h2">
                      ({review.stars} stars)
                    </Typography>
                  </Stack>
                  <Typography variant="h6" component="h2">
                      Comments - {review.reviewtxt}
                  </Typography>
                </Box>
            </Box>
            ))
            }
            </Box>
          </Modal>
          {String(listing.thumbnail).startsWith('data:image') &&
          <Box
          component="img"
          sx={{
            height: '30%',
            width: '1',
            marginTop: '4%'
          }}
          alt="The house from the offer."
          src={listing.thumbnail}/>
        }
        {String(listing.thumbnail).startsWith('https') && <ReactPlayer url={listing.thumbnail} alt='thumbnail' origin= 'http://localhost:3000'
          height="40rem" width="100%" autoPlay controls/>
        }
        <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
            Located at: {listing.address}
        </Typography>

        <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
            Amenities:
            {amenities.map((a, id) => {
              return (
                <React.Fragment key={id}>
                  -<Typography>
                    - {a}
                  </Typography>
                </React.Fragment>
              )
            })}
        </Typography>

        <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
            Bathrooms: {bathrooms}<br></br>
            Beds: {getNumBeds()}<br></br>
            Bedrooms: {bedrooms.length}
        </Typography>

        <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
            Price per night: {`$${listing.price}`}
        </Typography>

        <Typography variant="h6" component="h2" align='left' mt={2} ml={2}>
          Available Dates:
        </Typography>
        {availability.map((a, id) => {
          return (
            <React.Fragment key={id}>
              <Typography variant="h6" component="h2" align='left' mt={0} ml={4}>
                --- {a.start} to {a.end}
              </Typography>
            </React.Fragment>
          )
        })}
        {localStorage.getItem('token') !== null && (
          <React.Fragment>
          <Box sx={{ marginTop: '5%', marginBottom: '5%' }}>
          <TextField
            label="Booking Start"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={bookingDates.start}
            data-cy={'book_startdate'}
            onChange={(e) => {
              const dateObj = { ...bookingDates }
              dateObj.start = e.target.value
              setBookingDates(dateObj)
            }}
          />
          </Box>
          <Box sx={{ marginTop: '5%', marginBottom: '5%' }}>
          <TextField
            label="Booking End"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={bookingDates.end}
            data-cy={'book_enddate'}
            onChange={(e) => {
              const dateObj = { ...bookingDates }
              dateObj.end = e.target.value
              setBookingDates(dateObj)
            }}
          />
          </Box>
          <Button variant="contained" color="success" onClick={handleOpen} data-cy={'book_now_button'}>
            Book Now
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure, you want to book {listing.title} for
            </Typography>
            <br />
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Button variant="contained" color="success" onClick={bookListing} data-cy={'yes_conf_book'}>
                  Yes
                </Button>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  No
                </Button>
            </Stack>
            </Box>
          </Modal>
          </React.Fragment>
        )}
        <Typography variant="h5" component="h2" align='center' mt={2}>
            Reviews:
        </Typography>
        <br />
        { fetchedReview.map((review, key) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={key}>
            <Box sx={{ ...commonStyles, borderRadius: '16px', alignItems: 'center' }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Rating name="read-only" value={review.stars} readOnly/>
                <Typography variant="h6" component="h2">
                  ({review.stars} stars)
                </Typography>
              </Stack>
              <Typography variant="h6" component="h2">
                  Comments - {review.reviewtxt}
              </Typography>
            </Box>
          </Box>
        ))
        }
        <br />
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {isbooked === true && <Button variant="contained" color="success" onClick={handleOpenReview} data-cy={'leave_review'}>
            Leave a Review
          </Button>}
          {/* <Button variant="outlined" color="secondary">
            View all reviews
          </Button> */}
        </Stack>
      </Container>
      <Modal
        open={openreview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave a review
          </Typography>
          <br />
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={reviewValue}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValueReview(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {reviewValue !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : reviewValue]}</Box>
            )}
        </Box>
        <br />
        <TextField id="standard-basic" label="Review" variant="standard" data-cy={'leave_review_text'} onChange={(e) => setreviewText(e.target.value)}/>
        <br />
        <br />
        <Button variant="contained" color="success" data-cy={'leave_review_submit'} onClick={addreview}>
          Submit
        </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ViewFullListing;

ViewFullListing.propTypes = {
  token: PropTypes.string
}
