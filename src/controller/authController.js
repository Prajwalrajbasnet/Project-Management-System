const authService = require('../services/authService');

function loginUser(req, res, next) {
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
