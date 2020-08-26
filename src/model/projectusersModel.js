const bookshelf = require('../db');
const Project = require('./projectModel');
const User = require('./userModel');

const ProjectUsers = bookshelf.model('ProjectUsers', {
  tableName: 'project_user',
  project: function () {
    return this.belongsTo('Project');
  },
  user: function () {
    return this.belongsTo('User');
  }
});
module.exports = ProjectUsers;
