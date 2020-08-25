const authService = require('../services/authService'),
  { validationResult } = require('express-validator');

function loginUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  authService
    .signIn(req.body)
    .then((token) => {
      res.json({ token });
    })
    .catch((err) => next(err));
}

module.exports = {
  loginUser
};
