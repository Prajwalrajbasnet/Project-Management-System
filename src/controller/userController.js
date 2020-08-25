const userService = require('../services/userService');

function registerUser(req, res, next) {
  userService
    .createUser(req.body)
    .then((newUser) =>
      res.json({
        id: newUser.attributes.id,
        email: newUser.attributes.email,
        username: newUser.attributes.username,
        fname: newUser.attributes.fname,
        lname: newUser.attributes.lname,
        role: newUser.attributes.role
      })
    )
    .catch((err) => {
      err.message = 'Error occured while creating user';
      err.statusCode = 500;
      next(err);
    });
}

function fetchAllUsers(req, res, next) {
  userService
    .getAllUsers()
    .then((usersList) => res.json(usersList))
    .catch((err) => next(err));
}

function fetchUserById(req, res, next) {
  userService
    .getUser(req.params.id)
    .then((user) =>
      res.json({
        user
      })
    )
    .catch((err) => next(err));
}

function modifyUserById(req, res, next) {
  userService
    .updateUser(req.params.id, req.body)
    .then((data) =>
      res.json({
        id: data.attributes.id,
        email: data.attributes.email,
        username: data.attributes.username,
        fname: data.attributes.fname,
        lname: data.attributes.lname,
        role: data.attributes.role
      })
    )
    .catch((err) => {
      err.message = 'Error occured while modifying user';
      err.statusCode = 500;
      console.log(err);
      next(err);
    });
}

function removeUserById(req, res, next) {
  userService
    .deleteUser(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

module.exports = {
  registerUser,
  fetchAllUsers,
  fetchUserById,
  modifyUserById,
  removeUserById
};
