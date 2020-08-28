import { combineReducers } from 'redux';
import auth from './authReducer';
import projects from './projectReducer';
import tasks from './taskReducer';
import users from './userReducer';

export const rootReducer = combineReducers({
  auth,
  projects,
  tasks,
  users,
});
