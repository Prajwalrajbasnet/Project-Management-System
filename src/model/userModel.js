const bookshelf = require('../db');

const User = bookshelf.Model.extend({
  tableName: 'user'
});

module.exports = User;
