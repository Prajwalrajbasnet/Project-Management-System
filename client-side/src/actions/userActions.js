import { FETCH_USERS_BEGIN, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../constants/actionNames';
import userService from '../services/userService';

export function fetchUsersBegin() {
  return {
    type: FETCH_USERS_BEGIN,
  };
}

export function fetchUsersSuccess(tasks) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: tasks,
  };
}

export function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersBegin());
    return userService
      .getAllUsers()
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((error) => dispatch(fetchUsersFailure(error)));
  };
}

export function addUser(newUser, originalUsers, resolve) {
  return (dispatch) => {
    return userService
      .createUser(newUser)
      .then((res) => {
        const addedUser = [...originalUsers, newUser];
        dispatch(fetchUsersSuccess(addedUser));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchUsersFailure(error));
      });
  };
}

export function updateUser(updatedUser, oldUser, originalUsers, resolve) {
  return (dispatch) => {
    return userService
      .updateTask(updatedUser.id, updatedUser)
      .then((res) => {
        const usersList = [...originalUsers];
        usersList[oldUser.tableData.id] = updatedUser;
        dispatch(fetchUsersSuccess(usersList));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchUsersFailure(error));
      });
  };
}

export function deleteUser(oldUser, originalUsers, resolve) {
  return (dispatch) => {
    return userService
      .deleteUser(oldUser.id)
      .then((res) => {
        const usersList = [...originalUsers];
        usersList.splice(oldUser.tableData.id, 1);
        dispatch(fetchUsersSuccess(usersList));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
        dispatch(fetchUsersFailure(error));
      });
  };
}
