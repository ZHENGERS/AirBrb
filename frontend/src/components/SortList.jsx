/* eslint react/prop-types: 0 */
/* eslint no-undef: 0 */
import * as React from 'react';
import { makeRequest } from './Helpers';

const SortList = (props) => {
  console.log(props);
  const [bookings, setBookings] = React.useState([]);
  const [listings, setListings] = React.useState([]);
  const [otherlistings, setOtherListings] = React.useState([]);
  let price = null;
  let bedrooms = null;
  let title = null;
  let dateStart = null;
  let dateEnd = null;
  let address = null;

  const extractAttributesListing = async (listing) => {
    title = listing.title;
    price = listing.price;
  }

  const extractAttributesBooking = async (listing) => {
    const metadata = listing.listing.metadata;
    bedrooms = metadata.bedrooms.length;
    address = listing.listing.address;
    if (listing.listing.availability[0]) {
      dateStart = new Date(listing.listing.availability[0].start)
      dateEnd = new Date(listing.listing.availability[0].end)
    }
  }

  const conditionsMatch = async () => {
    // console.log(`price = ${price}, bedrooms = ${bedrooms}, title = ${title}, ratings = ${ratings}, datestart = ${dateStart}, dateend = ${dateEnd}`)
    const pro = props.filterdata;
    if (pro.bed_num === 0 && pro.maxPrice === '' && pro.minPrice === '' && pro.date[0] === null && pro.date[1] === null) {
      return true;
    } else if (pro.bed_num !== 0) {
      if (pro.bed_num > bedrooms) {
        return false;
      }
    } else if (pro.maxPrice !== '') {
      if (pro.maxPrice < price) {
        return false;
      }
    } else if (pro.minPrice !== '') {
      if (pro.minPrice > price) {
        return false
      }
    } else if (pro.date[0] !== '') {
      if (pro.date[0] < dateStart || pro.date[1] > dateEnd) {
        return false;
      }
    }
    return true;
  }

  const searchstringcheck = async () => {
    if (String(title).toUpperCase().includes(String(props.filterdata.search_string).toUpperCase()) || String(address).toUpperCase().includes(String(props.filterdata.search_string).toUpperCase())) {
      return true;
    } else {
      return false;
    }
  }

  // const emptyAll = async () => {
  //     publishedListing.length = 0;
  //     bookedPenListing.length = 0;
  //     diffListing.length = 0;
  // }
  const fetchallListings = async () => {
    // await emptyAll();
    const dataOne = await makeRequest('bookings', 'GET', undefined, props.token);
    if (dataOne.bookings > 0) {
      for (const booking of dataOne.bookings) {
        if (booking.owner === localStorage.getItem('user')) {
          setBookings((current) => [...current, booking]);
          // bookedPenListing.push(booking);
        }
      }
    }

    const data = await makeRequest('listings', 'GET', undefined, props.token);
    for (const listing of data.listings) {
      await extractAttributesListing(listing);
      const listingData = await makeRequest('listings/' + listing.id, 'GET', undefined, undefined)
      await extractAttributesBooking(listingData)
      const filterResult = await conditionsMatch();
      if (!filterResult) {
        continue;
      }
      if (props.filterdata.search_string !== '') {
        const searchstrResult = await searchstringcheck();
        if (!searchstrResult) {
          continue;
        }
      }
      for (const otherlist of bookings) {
        if (otherlist.listingId === listing.id) {
          setOtherListings((current) => [...current, listing]);
          // diffListing.push(otherlist);
          continue;
        }
      }
      if (listingData.listing.published) {
        console.log(listingData);
        console.log('matcheddd!!!');
        // publishedListing.push(listing);
        setListings((current) => [...current, listing]);
      }
    }
  }
  const sortaccratinglistings = (listings) => {
    if (props.filterdata.rating === 'Lowest') {
      setListings(listings.sort((a, b) => a.reviews[reviews.length - 1].avg.localeCompare(b.reviews[reviews.length - 1].avg)))
    } else {
      setListings(listings.sort((b, a) => b.reviews[reviews.length - 1].avg.localeCompare(a.reviews[reviews.length - 1].avg)))
    }
  }

  const sortaccratingotherlistings = (listings) => {
    if (props.filterdata.rating === 'Lowest') {
      setOtherListings(listings.sort((a, b) => a.reviews[reviews.length - 1].avg.localeCompare(b.reviews[reviews.length - 1].avg)))
    } else {
      setOtherListings(listings.sort((b, a) => b.reviews[reviews.length - 1].avg.localeCompare(a.reviews[reviews.length - 1].avg)))
    }
  }
  // const set = async() => {
  //     setListings(publishedListing);
  //     setBookings(bookedPenListing);
  //     setOtherListings(diffListing);
  // }

  const overall = async () => {
    await fetchallListings();
    props.setsearch(false);
  }

  React.useEffect(() => {
    overall();
  }, []);

  React.useEffect(() => {
    setListings(listings.sort((a, b) => a.title.localeCompare(b.title)))
    if (props.filterdata.rating !== '') {
      sortaccratinglistings(listings);
    }
    props.setfilteredpub(listings);
  }, [listings]);

  React.useEffect(() => {
    setOtherListings(otherlistings.sort((a, b) => a.title.localeCompare(b.title)))
    if (props.filterdata.rating !== '') {
      sortaccratingotherlistings(otherlistings);
    }
    props.setfilteredbook(otherlistings);
  }, [otherlistings]);
  return (
        <>
        </>
  )
}
export default SortList;
