import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import AuthService from '../../services/authService';
import { Alert, AlertTitle } from '@material-ui/lab';
import '../../styles/LoginForm.css';

function LoginForm(props) {
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyItems: 'center',
    },
    field: {
      marginTop: theme.spacing(2),
    },
    button: {
      color: '#ffffff',
      marginTop: theme.spacing(4),
    },
    genericAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }));

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#92BFB1' },
      secondary: { main: '#A61C3C' },
      // yellow: { main: '#F4AC45' },
    },
  });

  const classes = useStyles();

  const loginValidation = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string('Passowrd field cannot be empty')
      .min(5, 'Password should be at minimum 5 characters long')
      .required('Enter the password associated with your account')
      .matches(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/,
        'Password should contain : at least one digit, one upper case alphabet, one lower case alphabet, one special character and be 8-20 characters long'
      ),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  async function login(values) {
    const user = await AuthService.login(values.username, values.password);
    if (user) {
      props.login(user);
      history.push('/');
      window.location.reload();
      setVerified(true);
    } else {
      console.log(user);
      setVerified(false);
      const resMessage =
        (user.response && user.response.data && user.response.data.message) || user.message || user.toString();
      setMessage(resMessage);
    }
  }

  return (
    <div className={`${classes.paper} form`}>
      <div className="form-content">
        <h5 className="form-title">Login</h5>
        <Grid container alignItems="flex-start" justify="center" direction="row">
          <Avatar className={classes.genericAvatar} />
        </Grid>
        {message && !verified && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        )}
        <Formik initialValues={initialValues} onSubmit={login} validationSchema={loginValidation}>
          {({ values, touched, errors, handleSubmit, handleBlur, handleChange }) => (
            <Form>
              <ThemeProvider theme={theme}>
                <TextField
                  name="username"
                  className={classes.field}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username && touched.username}
                  helperText={errors.username && touched.username && errors.username}
                  id="username"
                  label="Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="password"
                  className={classes.field}
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password && errors.password}
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container alignItems="flex-start" justify="center" direction="row">
                  <Button name="submit" type="submit" className={classes.button} variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
              </ThemeProvider>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(loginUser(user));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
