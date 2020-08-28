import { combineReducers } from 'redux';
import auth from './authReducer';
import projects from './projectReducer';

export const rootReducer = combineReducers({
  auth,
  projects,
});
