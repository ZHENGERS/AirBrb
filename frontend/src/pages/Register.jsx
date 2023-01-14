import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { makeRequest } from '../components/Helpers';

const Register = (props) => {
  const [registerEmail, setEmail] = React.useState('');
  const [registerPwd, setPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [registerName, setName] = React.useState('');

  const submitForm = async event => {
    event.preventDefault();
    if (registerPwd !== confirmPwd) {
      alert("Passwords Don't Match")
    } else {
      const data = await makeRequest('user/auth/register', 'POST', {
        email: registerEmail,
        password: registerPwd,
        name: registerName,
      })
      if (data.error) {
        alert(data.error);
      } else {
        setEmail('');
        setPwd('');
        setName('');
        setConfirmPwd('');
        props.setTokenFn(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', registerEmail)
      }
    }
  };

  return (
    <>
    <Container maxWidth="sm" component="main">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <form onSubmit={submitForm}>
            <TextField
              type="text"
              label="Name"
              data-cy={'name_field'}
              onChange={(event) => setName(event.target.value)}
              value={registerName}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="text"
              label="Email Address"
              data-cy={'email_field'}
              onChange={(event) => setEmail(event.target.value)}
              value={registerEmail}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Password"
              data-cy={'password_field'}
              autoComplete="new-password"
              onChange={(event) => setPwd(event.target.value)}
              value={registerPwd}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Confirm Password"
              data-cy={'confirm_password_field'}
              autoComplete="new-password"
              onChange={(event) => setConfirmPwd(event.target.value)}
              value={confirmPwd} margin="normal"
              fullWidth
              required
            />
            <Button name='conf_register' variant='contained' type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>Register</Button>
          </form>
          <span>Already have an account? <Link to="/login" >Sign In</Link></span>
        </Box>
      </Container>
    </>
  );
}

export default Register;

Register.propTypes = {
  setTokenFn: PropTypes.func,
};
