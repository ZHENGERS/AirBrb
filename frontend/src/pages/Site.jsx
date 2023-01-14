import React from 'react';
import Login from './Login';
import Register from './Register';
import HostedListings from './HostedListings';
import EditListing from './EditListing';
import NavBar from '../components/NavBar'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { makeRequest } from '../components/Helpers';
import ViewBookingRequests from './ViewBookingRequests';
import ViewFullListing from './ViewFullListing';
import HomePage from './HomePage';

function Site () {
  const [token, setToken] = React.useState(null);
  const history = useHistory()
  const { pathname } = useLocation();

  React.useEffect(() => {
    const isToken = localStorage.getItem('token');
    if (isToken) {
      setToken(isToken);
    }
  }, []);

  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        history.push('/dashboard');
      }
    }
  }, [token]);

  const logout = async () => {
    await makeRequest('user/auth/logout', 'POST', undefined, token)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login')
    setToken(null);
  }

  return (
    <div>
      <NavBar token={token} logoutFn={logout} />
      <Switch>
        <Route path="/login">
          <Login setTokenFn={setToken}/>
        </Route>
        <Route path="/register">
          <Register setTokenFn={setToken}/>
        </Route>
        <Route path="/hosted">
          <HostedListings token={token} />
        </Route>
        <Route path="/edit/:id" exact>
          <EditListing />
        </Route>
        <Route path = "/bookings/:id" exact>
          <ViewBookingRequests />
        </Route>
        <Route path = "/listings/:id" exact>
          <ViewFullListing token={token}/>
        </Route>
        <Route path = "/listings/:id" exact>
          <ViewFullListing token={token}/>
        </Route>
        <Route path="/">
          <HomePage token={token} />
        </Route>
      </Switch>
    </div>
  );
}

export default Site;
