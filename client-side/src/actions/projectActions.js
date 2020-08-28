import { FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE } from '../constants/actionNames';
import projectService from '../services/projectService';

export function fetchProjectsBegin() {
  return {
    type: FETCH_PROJECTS_BEGIN,
  };
}

export function fetchProjectsSuccess(projects) {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: projects,
  };
}

export function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS_FAILURE,
    payload: error,
  };
}

export function fetchProjects() {
  return (dispatch) => {
    dispatch(fetchProjectsBegin());
    return projectService
      .getAllProjects()
      .then((res) => {
        dispatch(fetchProjectsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchProjectsFailure));
  };
}
