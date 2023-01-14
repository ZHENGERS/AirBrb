import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { makeRequest } from '../components/Helpers';

const Login = (props) => {
  const [loginEmail, setEmail] = React.useState('');
  const [loginPwd, setPwd] = React.useState('');

  const submitForm = async event => {
    event.preventDefault();
    const data = await makeRequest('user/auth/login', 'POST', {
      email: loginEmail,
      password: loginPwd
    })
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data.token)
      setEmail('');
      setPwd('');
      props.setTokenFn(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', loginEmail)
    }
  };

  return (
    <>
      <Container maxWidth="sm" component="main">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <form onSubmit={submitForm}>
            <TextField
              type="text" label="Email Address"
              data-cy={'login_email'}
              onChange={(event) => setEmail(event.target.value)}
              value={loginEmail} margin="normal"
              fullWidth
              required
            />
            <TextField
              type="password"
              data-cy={'login_password'}
              label="Password"
              autoComplete="new-password"
              onChange={(event) => setPwd(event.target.value)}
              value={loginPwd}
              margin="normal"
              fullWidth
              required
            />
            <Button variant='contained' type="submit" name="submit_login" sx={{ mt: 3, mb: 2 }} fullWidth>Login</Button>
          </form>
          <span>Don`t have an account? <Link to="/register" id='create_account'>Create new account</Link></span>
        </Box>
      </Container>
    </>
  );
}

export default Login;

Login.propTypes = {
  setTokenFn: PropTypes.func,
};
