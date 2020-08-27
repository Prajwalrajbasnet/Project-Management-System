const User = require('../model/userModel'),
  bcrypt = require('bcryptjs'),
  tokenService = require('./tokenService');

async function signIn(loginCredentials) {
  try {
    const user = await getUser(loginCredentials);
    const token = tokenService.createToken({
      id: user.id
    });
    return {
      token
    };
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      err.message = 'Wrong username password combination';
    }
    throw err;
  }
}

function getUser(loginCredentials) {
  return User.where({
    username: loginCredentials.username
  })
    .fetch()
    .then((user) => {
      if (!user) {
        throw 'User Not Found';
      }
      const passwordIsValid = bcrypt.compareSync(loginCredentials.password, user.attributes.password);
      if (passwordIsValid) {
        return user;
      } else {
        throw 'Wrong username password combination';
      }
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  signIn,
  getUser
};
