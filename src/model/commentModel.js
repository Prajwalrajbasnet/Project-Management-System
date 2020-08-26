const bookshelf = require('../db');
const Task = require('./taskModel');
const User = require('./userModel');

const Comment = bookshelf.Model.extend({
  tableName: 'comment',
  task: function () {
    return this.belongsTo(Task);
  },
  user: function () {
    return this.belongsTo(User);
  }
});

module.exports = Comment;
