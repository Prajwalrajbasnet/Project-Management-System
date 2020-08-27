const bookshelf = require('../db');
const Project = require('./projectModel');
const Comment = require('./commentModel');
const Task = require('./taskModel');
const Tags = require('./tagsModel');

const User = bookshelf.model('User', {
  tableName: 'user',
  project: function () {
    return this.belongsToMany('Project');
  },
  task: function () {
    return this.hasMany('Task');
  },
  comment: function () {
    return this.hasMany('Comment');
  },
  tags: function () {
    return this.hasMany('Tags');
  }
});

module.exports = User;
