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
      username: newDetails.username
    },
    {
      patch: true
    }
  );
}

function updateUserWithRole(id, details) {
  return User.where({ id }).save(
    {
      fname: details.fname,
      lname: details.lname,
      email: details.email,
      username: details.username,
      role: details.role
    },
    {
      patch: true
    }
  );
}

function verifyPassword(id, plainPassword) {
  return User.where({ id })
    .fetch()
    .then((user) => {
      const passwordIsValid = bcrypt.compareSync(plainPassword, user.attributes.password);
      return passwordIsValid;
    })
    .catch((err) => {
      throw err;
    });
}

function updatePassword(id, plainPassword) {
  const hashedPassword = bcrypt.hashSync(plainPassword, 12);
  return User.where({ id }).save(
    {
      password: hashedPassword
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
  updateUserWithRole,
  verifyPassword,
  updatePassword,
  deleteUser
};
