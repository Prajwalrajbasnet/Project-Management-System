const bookshelf = require('../db');
const Task = require('./taskModel');
const User = require('./userModel');

const Tags = bookshelf.model('Tags', {
  tableName: 'tags',
  task: function () {
    return this.belongsTo('Task');
  },
  user: function () {
    return this.belongsTo('User');
  }
});

module.exports = Tags;
