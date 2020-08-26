const bookshelf = require('../db');
const Project = require('./projectModel');
const User = require('./userModel');
const Comment = require('./commentModel');

const Task = bookshelf.Model.extend({
  tableName: 'task',
  project: function () {
    return this.belongsTo(Project);
  },
  user: function () {
    return this.hasOne(User);
  },
  comment: function () {
    return this.hasMany(Comment);
  }
});

module.exports = Task;
