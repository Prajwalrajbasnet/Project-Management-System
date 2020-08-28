import { combineReducers } from 'redux';
import auth from './authReducer';
import projects from './projectReducer';
import tasks from './taskReducer';

export const rootReducer = combineReducers({
  auth,
  projects,
  tasks,
});
