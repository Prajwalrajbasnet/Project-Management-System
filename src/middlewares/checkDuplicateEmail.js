const userService = require('../services/userService');

module.exports = (req, res, next) => {
  userService
    .getUserByEmail(req.body.email)
    .then((user) => {
      const available = user.length < 1 ? true : false;
      if (!available) {
        return next('Email is already in use');
      } else {
        return next();
      }
    })
    .catch((err) => {
      if (err.message === 'EmptyResponse') {
        return next();
      }
      return next(err);
    });
};
