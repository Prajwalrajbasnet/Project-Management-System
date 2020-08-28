const userService = require('../services/userService'),
  { validationResult } = require('express-validator'),
  { userRoles } = require('../constants');

function registerUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

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

function fetchCurrentUser(req, res, next) {
  userService
    .getUser(req.user.attributes.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function modifyUserById(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  if (req.user.attributes.role === userRoles.admin) {
    userService
      .updateUserWithRole(req.params.id, req.body)
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
        next(err);
      });
  } else {
    userService
      .updateUser(req.params.id, req.body)
      .then((data) =>
        res.json({
          id: data.attributes.id,
          email: data.attributes.email,
          username: data.attributes.username,
          fname: data.attributes.fname,
          lname: data.attributes.lname
        })
      )
      .catch((err) => {
        err.message = 'Error occured while modifying user';
        err.statusCode = 500;
        next(err);
      });
  }
}

async function changePassword(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  try {
    const valid = await userService.verifyPassword(req.params.id, req.body.previousPassword);
    if (valid) {
      userService
        .updatePassword(req.params.id, req.body.newPassword)
        .then((response) => {
          res.json({
            message: 'Update successful',
            status: 200
          });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      next('Wrong previous password');
    }
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      next('Wrong previous password');
    }
    throw err;
  }
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
  fetchCurrentUser,
  modifyUserById,
  changePassword,
  removeUserById
};
