import React, { useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectsInfo from './ProjectsInfo';
import UsersInfo from './UsersInfo';
import TasksInfo from './TasksInfo';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = ({ isLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    // if (!isLoggedIn) {
    //   history.push('/login');
    //   window.location.reload();
    // }
  });

  return (
    <DashboardLayout>
      <Container className={classes.root} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <ProjectsInfo />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <UsersInfo />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TasksInfo />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Dashboard);
