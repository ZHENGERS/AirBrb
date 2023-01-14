import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Container } from '@mui/material';
import { makeRequest } from '../components/Helpers';
import { useParams, useHistory } from 'react-router-dom';

const ViewBookingRequests = (props) => {
  const params = useParams()
  const history = useHistory()

  const [listing, setListing] = React.useState('')
  const [bookings, setBookings] = React.useState([])

  const getListing = async () => {
    const data = await makeRequest('listings/' + params.id, 'GET', undefined, undefined);
    setListing(data.listing)
  }

  const getBookings = async () => {
    const data = await makeRequest('bookings/', 'GET', undefined, localStorage.getItem('token'))
    const bookingList = []
    for (const booking of data.bookings) {
      if (booking.listingId === params.id) {
        bookingList.push(booking)
      }
    }
    setBookings(bookingList)
  }

  const listingActiveTime = () => {
    const curr = new Date()
    const listingDate = new Date(listing.postedOn)
    const activeTime = (curr.getDate() - listingDate.getDate())
    return activeTime
  }

  const getListingProfit = () => {
    let profit = 0
    for (const booking of bookings) {
      const bookingYear = new Date(booking.dateRange.start).getFullYear()
      const currYear = new Date().getFullYear()
      if (booking.status === 'accepted' && bookingYear === currYear) {
        profit += booking.totalPrice
      }
    }
    return profit
  }

  const getListingDaysBooked = () => {
    let daysBooked = 0
    for (const booking of bookings) {
      if (booking.status === 'accepted') {
        const curYear = new Date().getFullYear()
        const bookSt = new Date(booking.dateRange.start)
        const bookEn = new Date(booking.dateRange.end)
        if ((bookSt.getFullYear() === curYear) && (bookEn.getFullYear() === curYear)) {
          const diff = (bookEn - bookSt) / (1000 * 60 * 60 * 24)
          daysBooked += diff
        } else if ((bookSt.getFullYear() === curYear) && (bookEn.getFullYear() !== curYear)) {
          console.log('')
        }
      }
    }
    return daysBooked.toFixed()
  }

  const acceptBooking = async (bookingId, dateRange) => {
    const curListing = listing
    const availability = curListing.availability
    let i = 0
    while (i < availability.length) {
      const availabilityStart = new Date(availability[i].start)
      const availabilityEnd = new Date(availability[i].end)
      const bookingStart = new Date(dateRange.start)
      const bookingEnd = new Date(dateRange.end)

      if (bookingStart >= availabilityStart && bookingEnd <= availabilityEnd) {
        const data = await makeRequest('bookings/accept/' + bookingId, 'PUT', undefined, localStorage.getItem('token'))
        console.log(data)
        if (data.error) {
          alert(data.error)
        } else {
          // unpublishListing()
          // updateAvailability(dateRange, availability[i])
          getBookings()
          break
        }
      }
      i += 1
    }
  }

  // const unpublishListing = async () => {
  //   const data = await makeRequest('listings/unpublish/' + params.id, 'PUT', undefined, localStorage.getItem('token'))
  //   console.log(data)
  //   getListing()
  // }

  // const updateAvailability = async (bookingDates, availability) => {
  //   const bookingStart = new Date(bookingDates.start)
  //   const bookingEnd = new Date(bookingDates.end)
  //   const availabilityStart = new Date(availability.start)
  //   const availabilityEnd = new Date(availability.end)

  //   const newAvailabilities = []

  //   if (bookingStart > availabilityStart) {
  //     const avail = {
  //       start: availability.start,
  //       end: bookingDates.start
  //     }
  //     newAvailabilities.push(avail)
  //   }
  //   if (bookingEnd < availabilityEnd) {
  //     const avail = {
  //       start: bookingDates.end,
  //       end: availability.end
  //     }
  //     newAvailabilities.push(avail)
  //   }

  //   const avails = listing.availability
  //   const index = avails.indexOf(availability)
  //   if (index > -1) {
  //     avails.splice(index, 1);
  //   }

  //   for (const a of newAvailabilities) {
  //     avails.push(a)
  //   }

  //   const body = {
  //     availability: avails
  //   }

  //   console.log(params.id)
  //   const data = await makeRequest('listings/publish/' + params.id, 'PUT', body, localStorage.getItem('token'))
  //   if (data.error) {
  //     alert(data.error)
  //   } else {
  //     getListing()
  //   }
  // }

  const denyBooking = async (bookingId) => {
    const data = await makeRequest('bookings/decline/' + bookingId, 'PUT', undefined, localStorage.getItem('token'))
    if (data.error) {
      alert(data.error)
    } else {
      getBookings()
    }
  }

  React.useEffect(() => {
    getListing()
    getBookings()
  }, [])

  return (
    <React.Fragment>
      <Container component="main" sx={{ marginBottom: '64px' }}>
        <Button onClick={() => {
          history.push('/hosted')
        }}>Back</Button>

        <Typography variant='h5'>Listing Statistics</Typography>
        <Typography>Listing has been active for: {listingActiveTime()} days</Typography>
        <Typography>Profit this year: ${getListingProfit()} </Typography>
        <Typography>Days booked this year: {getListingDaysBooked()} days </Typography>
        <br></br>
        <Typography variant='h5'>Current Booking Requests</Typography>
        {(bookings.length === 0) && (
          <div> Currently no booking requests </div>
        )}
        {bookings.map((booking, id) => {
          return (
            <React.Fragment key={id}>
              {booking.status === 'pending' && (
                <>
                  <hr></hr>
                  <Typography>New booking request from {booking.owner}</Typography>
                  <Typography>{booking.dateRange.start} to {booking.dateRange.end}</Typography>
                  <Typography>${booking.totalPrice}</Typography>
                  <Button data-cy={`accept_booking-${id}`}onClick={() => {
                    acceptBooking(booking.id, booking.dateRange)
                  }}>Accept</Button>
                  <Button color='error' onClick={() => {
                    denyBooking(booking.id)
                  }}>Deny</Button>
                  <hr></hr>
                </>
              )}
            </React.Fragment>
          )
        })}
        <br></br>
        <Typography variant='h5'>Booking Request History</Typography>
        {bookings.map((booking, id) => {
          return (
            <React.Fragment key={id}>
              {booking.status !== 'pending' && (
                <>
                  <hr></hr>
                  <Typography>Booking by {booking.owner}</Typography>
                  <Typography>{booking.dateRange.start} to {booking.dateRange.end}</Typography>
                  <Typography>${booking.totalPrice}</Typography>
                  <hr></hr>
                </>
              )}
            </React.Fragment>
          )
        })}
      </Container>
    </React.Fragment>
  )
}

export default ViewBookingRequests

ViewBookingRequests.propTypes = {
  token: PropTypes.string
}
