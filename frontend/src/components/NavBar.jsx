import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BedIcon from '@mui/icons-material/Bed';
import { Link } from 'react-router-dom'

function NavBar (props) {
  const [value, setValue] = React.useState(0);

  return (
    <nav>
      {!props.token && (
          <BottomNavigation
            sx={{ borderTop: '1px solid #999', position: 'fixed', bottom: 0, width: 1.0, zIndex: 2 }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Explore" icon={ <SearchIcon/> } data-cy={'explore-button'} component={Link} to='/' />
            <BottomNavigationAction label="Log in" icon={ <AccountCircleIcon/> } data-cy={'account-button'} component={Link} to='/login'/>
          </BottomNavigation>
      )}
      {props.token && (
          <BottomNavigation
            sx={{ borderTop: '1px solid #999', position: 'fixed', bottom: 0, width: 1.0, zIndex: 2 }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Explore" data-cy={'explore_button_sec'} icon={ <SearchIcon/>} component={Link} to='/' />
            <BottomNavigationAction label="My Listings" icon={ <BedIcon/> } data-cy={'my_listings_button'} component={Link} to='/hosted' />
            <BottomNavigationAction label="Log Out" data-cy={'logout_button'} onClick={props.logoutFn} />
          </BottomNavigation>
      )}
    </nav>
  )
}

NavBar.propTypes = {
  token: PropTypes.string,
  logoutFn: PropTypes.func,
};

export default NavBar;
