const bookshelf = require('../db');
const ProjectUsers = require('./projectusersModel');

const User = bookshelf.Model.extend({
  tableName: 'user',
  projectusers: function () {
    return this.hasMany(ProjectUsers);
  }
});

module.exports = User;
