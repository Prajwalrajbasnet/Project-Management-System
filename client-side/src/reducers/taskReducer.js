import { FETCH_TASKS_BEGIN, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from '../constants/actionNames';

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TASKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
