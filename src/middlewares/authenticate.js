const jwt = require('jsonwebtoken'),
  userService = require('../services/userService');
module.exports = (req, res, next) => {
  let token = '';
  if (req.headers['authentication']) {
    token = req.headers['authentication'];
  }
  if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }
  if (req.headers['token']) {
    token = req.headers['token'];
  }
  if (!token) {
    return res.status(401).send({
      message: 'Acess Token Not Found'
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decodedData) => {
    if (err) {
      next(err);
    }
    const id = decodedData.id;
    userService
      .getUser(id)
      .then((user) => {
        req.user = user;
        return next();
      })
      .catch((err) => next(err));
  });
};
