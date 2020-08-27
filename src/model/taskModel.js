const bookshelf = require('../db');
const Project = require('./projectModel');
const User = require('./userModel');
const Comment = require('./commentModel');
const Tags = require('./tagsModel');

const Task = bookshelf.model('Task', {
  tableName: 'task',
  project: function () {
    return this.belongsTo('Project');
  },
  user: function () {
    return this.hasOne('User');
  },
  comment: function () {
    return this.hasMany('Comment');
  },
  tags: function () {
    return this.hasMany('Tags');
  }
});

module.exports = Task;
