import React, { useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import ProjectCard from './ProjectCard';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projectActions';
import Dashboard from '../Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  projectCard: {
    height: '100%',
  },
}));

const ProjectsList = ({ projects, loadProjects, user }) => {
  const classes = useStyles();

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      <Container className={classes.root} maxWidth={false}>
        {user.role === 'admin' && <Toolbar />}
        <Box mt={3}>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item key={project.id} lg={4} md={6} xs={12}>
                <ProjectCard className={classes.projectCard} project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

function mapStateToProps(state) {
  return {
    projects: state.projects.items || [],
    loading: state.projects.loading,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjects: () => {
      dispatch(fetchProjects());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
