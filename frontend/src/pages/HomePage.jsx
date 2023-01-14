import React from 'react';
import PropTypes from 'prop-types';
import { makeRequest } from '../components/Helpers';
import SearchAppBar from '../components/SearchBar';
import ListingFormat from '../components/listingformat';
import { Container } from '@mui/material';

const HomePage = (props) => {
  const [bookings, setBookings] = React.useState([]);
  const [listings, setListings] = React.useState([]);
  const [otherlistings, setOtherListings] = React.useState([]);
  const [filteredPublished, setfilteredPublished] = React.useState([]);
  const [filteredBooked, setfilteredBooked] = React.useState([]);

  const publishedListing = [];
  const bookedPenListing = [];
  const diffListing = []

  const emptyAll = async () => {
    publishedListing.length = 0;
    bookedPenListing.length = 0;
    diffListing.length = 0;
  }

  // const conditions_match = async () => {
  //   if (location.state) {
  //     let pro = location.state.prop
  //     let start_date = null;
  //     let end_date = null;
  //     if (pro.date) {
  //       start_date = new Date(pro.date[0].$d)
  //       end_date = new Date(pro.date[1].$d)
  //     }
  //     if (pro.bed_num === 0 && pro.max_price === 0 && pro.min_price === 0  && pro.rating === '' && pro.search_string === '' && pro.date[0] === null && pro.date[1] ===  null) {
  //       return true;
  //     } else if (pro.bed_num !== bedrooms || pro.max_price < price || pro.min_price > price){
  //       return false;
  //     } else if (start_date >= date_start && end_date <= date_end) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  const fetchallListings = async () => {
    await emptyAll();
    const dataOne = await makeRequest('bookings', 'GET', undefined, props.token);
    if (dataOne.bookings > 0) {
      for (const booking of dataOne.bookings) {
        if (booking.owner === localStorage.getItem('user')) {
          bookedPenListing.push(booking);
        }
      }
    }

    const data = await makeRequest('listings', 'GET', undefined, props.token);
    for (const listing of data.listings) {
      const listingData = await makeRequest('listings/' + listing.id, 'GET', undefined, undefined)
      // const filter_result = await conditions_match();
      // if (!filter_result) {
      //   continue;
      // }
      for (const otherlist of bookings) {
        if (otherlist.listingId === listing.id) {
          diffListing.push(otherlist);
          continue;
        }
      }
      if (listingData.listing.published) {
        publishedListing.push(listing);
      }
    }
    setListings(publishedListing);
    setBookings(bookedPenListing);
    setOtherListings(diffListing);
  }

  const changeHomeScreenPublished = () => {
    setListings(filteredPublished)
  }

  const changeHomeScreenBooked = () => {
    setOtherListings(filteredBooked)
  }

  // React.useEffect(() => {
  //   fetchallListings();
  // }, [location]);

  React.useEffect(() => {
    fetchallListings();
  }, []);

  React.useEffect(() => {
    changeHomeScreenPublished();
  }, [filteredPublished]);

  React.useEffect(() => {
    changeHomeScreenBooked();
  }, [filteredBooked]);

  return (
    <>
      <SearchAppBar token = {props.token} setfilteredpub = {setfilteredPublished} setfilteredbook={setfilteredBooked}></SearchAppBar>
      <Container component="main" sx={{ marginBottom: '64px' }}>
        {otherlistings.map((object, key) => <ListingFormat key = {key} keys = {key} listing={object}/>)}
        {/* {price}{bedrooms}{title}{ratings}{dateStart}{dateEnd} */}
        {listings.map((object, key) => <ListingFormat key = {key} keys = {key} listing={object}/>)}
      </Container>
    </>
  );
}

export default HomePage;

HomePage.propTypes = {
  token: PropTypes.string,
};
