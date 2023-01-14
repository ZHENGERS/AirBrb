import PropTypes from 'prop-types';
import { makeRequest } from '../components/Helpers';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import ListingNew from './ListingNew';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import PublishListing from '../components/PublishListing';
import UnpublishListing from '../components/UnpublishListing';
import ProfitGraph from '../components/ProfitGraph';
import DeleteListing from '../components/DeleteListing';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ReactPlayer from 'react-player';

const HostedListings = (props) => {
  const [listings, setListings] = React.useState([]);

  const history = useHistory()

  const fetchListings = async () => {
    const data = await makeRequest('listings', 'GET', undefined, props.token);
    const hosted = []
    for (const listing of data.listings) {
      if (listing.owner === localStorage.getItem('user')) {
        const listingData = await makeRequest('listings/' + listing.id, 'GET', undefined, undefined)
        listing.metadata = listingData.listing.metadata
        listing.published = listingData.listing.published
        listing.availability = listingData.listing.availability
        hosted.push(listing)
      }
    }
    setListings(hosted);
  }

  React.useEffect(() => {
    fetchListings();
  }, []);

  const getNumBeds = (id) => {
    const bedrooms = listings[id].metadata.bedrooms
    let numBeds = 0
    for (const room of bedrooms) {
      numBeds += room.beds.length
    }
    return numBeds
  }

  return (
    <>
      <Container component="main" sx={{ marginBottom: '64px' }}>
        <CssBaseline />
        <ProfitGraph token={props.token} />
        <Typography variant="h4">My Current listings</Typography>
        <br />
        <ListingNew
          token={ props.token }
          getListings={ fetchListings }
        />
        {listings.map((listing, idx) => {
          return (
            <React.Fragment key={idx}>
              <Card sx={{ width: '75%', m: 2 }}>
                <CardHeader
                    title={listing.title}
                    action={
                      <IconButton
                        aria-label="Edit"
                        data-cy={`edit-${idx}`}
                        size="small"
                        onClick={() => {
                          history.push('/edit/' + listing.id)
                        }}
                      >
                        <EditIcon />
                        <div>
                          Edit
                        </div>
                      </IconButton>
                    }
                />
                {listing.thumbnail.startsWith('data:image') &&
                  <CardMedia
                    component="img"
                    height="194"
                    image={listing.thumbnail}
                    alt="Thumbnail"
                  />}{listing.thumbnail.startsWith('https') && (<ReactPlayer url={listing.thumbnail} alt='thumbnail' origin= 'http://localhost:3000'
                  height="15rem" width="100%" autoPlay controls/>)}
                <CardContent>
                  <Typography component="legend" color="text.secondary" variant="body2">
                    Average Rating ({listing.reviews.length} reviews)
                  </Typography>
                  <Rating name="read-only" value={4} readOnly /><br></br>
                  <Typography variant="body">
                    {listing.address} {listing.metadata.type}
                  </Typography>
                  <Typography>
                    Beds: {getNumBeds(idx)}
                  </Typography>
                  <Typography>
                    Bathrooms: {listing.metadata.bathrooms} <br />
                  </Typography>
                  <Typography component="legend">Price: ${listing.price}/night</Typography>
                  {!listing.published && (
                    <PublishListing token={props.token} listingId={listing.id} getListings={fetchListings} listingid={idx}/>
                  )}
                  {listing.published && (
                    <React.Fragment>
                      <UnpublishListing token={props.token} listingId={listing.id} getListings={fetchListings} listingid={idx}/>
                      <Button data-cy={`view_booking-${idx}`} onClick={() => {
                        history.push('/bookings/' + listing.id)
                      }}>View Bookings</Button>
                    </React.Fragment>
                  )}

                  <DeleteListing token={props.token} listingId={listing.id} getListings={fetchListings} />
                </CardContent>
              </Card>
            </React.Fragment>
          )
        })}
        <hr />
      </Container>
    </>
  );
}

export default HostedListings;

HostedListings.propTypes = {
  token: PropTypes.string,
};
