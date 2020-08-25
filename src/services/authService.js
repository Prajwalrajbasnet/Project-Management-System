const User = require('../model/userModel'),
  tokenService = require('./tokenService');

async function signIn(loginCredentials) {
  console.log('in sigin service');
  try {
    const user = await getUser(loginCredentials);
    const token = tokenService.createToken(user.id);
    return {
      token
    };
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      err.message = 'Wrong Username or Password';
    }
    throw err;
  }
}

function getUser(loginCredentials) {
  return User.where({
    username: loginCredentials.username,
    password: loginCredentials.password
  })
    .fetch()
    .then((user) => {
      if (!user) {
        throw 'User Not Found';
      }
      return user;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  signIn,
  getUser
};
