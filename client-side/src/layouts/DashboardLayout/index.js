import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { connect } from 'react-redux';
import { fetchUser, setUser } from '../../actions/authActions';
import UserService from '../../services/userService';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

const DashboardLayout = ({ children, setUser, isLoggedIn }) => {
  const history = useHistory();
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: () => dispatch(fetchUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
