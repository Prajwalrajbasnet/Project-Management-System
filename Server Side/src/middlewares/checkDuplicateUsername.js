const userService = require('../services/userService');

module.exports = (req, res, next) => {
  userService
    .getUserByUsername(req.body.username)
    .then((user) => {
      const available = user.length < 1 ? true : false;
      if (!available) {
        return next('Username is already in use');
      }
      return next();
    })
    .catch((err) => {
      if (err.message === 'EmptyResponse') {
        return next();
      }
      return next(err);
    });
};
