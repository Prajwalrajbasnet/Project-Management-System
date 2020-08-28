import React, { useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectsInfo from './ProjectsInfo';
import UsersInfo from './UsersInfo';
import TasksInfo from './TasksInfo';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/userActions';
import { fetchProjects } from '../../actions/projectActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = ({ users, projects, loadUsers, loadProjects }) => {
  const classes = useStyles();

  useEffect(() => {
    loadUsers();
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      <Container className={classes.root} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <ProjectsInfo count={projects.length} />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <UsersInfo count={users.length} />
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
    users: state.users.items,
    projects: state.projects.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    loadProjects: () => dispatch(fetchProjects()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
