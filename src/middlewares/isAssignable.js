const userService = require('../services/userService'),
  { userRoles } = require('../constants');

module.exports = (req, res, next) => {
  userService.getUser(req.body.userId).then((user) => {
    if (user.attributes.role === userRoles.tl || user.attributes.role === userRoles.engineer) {
      next();
    } else {
      res.status(406).json({
        message: 'The requested user is not assignable'
      });
    }
  });
};
