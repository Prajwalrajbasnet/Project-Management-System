const jwt = require('jsonwebtoken');

exports.createToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY);
};
