const User = require('../model/userModel'),
  bcrypt = require('bcryptjs');

function createUser(userDetails) {
  return new User({
    fname: userDetails.fname,
    lname: userDetails.lname,
    email: userDetails.email,
    username: userDetails.username,
    password: bcrypt.hashSync(userDetails.password, 12),
    role: userDetails.role
  }).save();
}

function getAllUsers() {
  return User.fetchAll({ columns: ['id', 'fname', 'lname', 'username', 'email', 'role', 'created_at', 'updated_at'] });
}

function getUser(id) {
  return User.where({ id }).fetch({
    columns: ['id', 'fname', 'lname', 'username', 'email', 'role', 'created_at', 'updated_at']
  });
}

function updateUser(id, newDetails) {
  return User.where({ id }).save(
    {
      fname: newDetails.fname,
      lname: newDetails.lname,
      email: newDetails.email,
      username: newDetails.username,
      role: newDetails.role
    },
    {
      patch: true
    }
  );
}

function deleteUser(id) {
  return User.where({ id }).destroy();
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
