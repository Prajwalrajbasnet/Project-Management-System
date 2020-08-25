const { userRoles } = require('../constants');

const isAdmin = (req, res, next) => {
  req.user.attributes.role === userRoles.admin ? next() : next('Admin permission required');
};

const isAdminOrOwner = (req, res, next) => {
  req.user.attributes.id == req.params.id ? next() : next('Permission denied');
};

module.exports = {
  isAdmin,
  isAdminOrOwner
};
