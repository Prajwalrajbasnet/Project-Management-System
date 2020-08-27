const bookshelf = require('../db');
const User = require('./userModel');
const Task = require('./taskModel');

const Project = bookshelf.model('Project', {
  tableName: 'project',
  user: function () {
    return this.belongsToMany('User');
  },
  task: function () {
    return this.hasMany('Task');
  }
});

module.exports = Project;
