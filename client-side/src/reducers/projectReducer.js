import { FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE } from '../constants/actionNames';

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
