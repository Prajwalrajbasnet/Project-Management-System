const bookshelf = require('../db');
const ProjectUsers = require('./projectusersModel');

const Project = bookshelf.Model.extend({
  tableName: 'project',
  projectusers: function () {
    return this.hasMany(ProjectUsers);
  }
});

module.exports = Project;
