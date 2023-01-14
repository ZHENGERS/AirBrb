import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

const ListingFormat = (props) => {
  const [reviewexists, setreviewexists] = React.useState(false);

  const history = useHistory();
  const listing = props.listing;
  const reviewexistsfunc = () => {
    if (listing.reviews.length !== 0) {
      setreviewexists(true);
    }
  }
  const price = `$${listing.price}`
  const individualListing = () => {
    history.push({
      pathname: '/listings/' + listing.id,
      state: {
        prop: listing,
      },
    });
  }
  React.useEffect(() => {
    reviewexistsfunc();
  }, [])
  return (
      <Card sx={{ width: '75%', m: 2 }}>
      <CardHeader
          title={listing.title}
      />
      {listing.thumbnail.startsWith('data:image') && <CardMedia
          component="img"
          height="194"
          image={listing.thumbnail}
          alt="Thumbnail"
      />}{listing.thumbnail.startsWith('https') && (<ReactPlayer url={listing.thumbnail} alt='thumbnail' origin= 'http://localhost:3000'
      height="15rem" width="100%" autoPlay controls/>)}
      <CardContent>
          <Typography variant="body2" color="text.secondary">
          {listing.address}
          </Typography>
          <Typography component="legend">{price}</Typography>
          {reviewexists && <Rating name="read-only" value={listing.reviews[listing.reviews.length - 1].avg} readOnly />}
          {!reviewexists && <Rating name="read-only" value={0} readOnly />}
      </CardContent>
      <CardActions>
          <Button size='small' onClick = {individualListing} data-cy={`view_button-${props.keys}`}>View</Button>
      </CardActions>
      </Card>
      /* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
          <ShareIcon />
          </IconButton>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
          </ExpandMore>
      </CardActions> *//* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
          </Typography>
          <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
          </CardContent>
      </Collapse> */
  );
};

export default ListingFormat;

ListingFormat.propTypes = {
  listing: PropTypes.object,
  keys: PropTypes.number
}
