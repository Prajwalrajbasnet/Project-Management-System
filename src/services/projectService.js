const Project = require('../model/projectModel');
const User = require('../model/userModel');

function getAllProjects() {
  return Project.fetchAll();
}

function getProjectsAssociatedToUser(userId) {
  console.log('fetching projects of single user with id ', userId);
  return User.where({ id: userId })
    .fetch({ withRelated: ['project'] })
    .then((output) => output.project)
    .catch((err) => {
      throw err;
    });
}

function createProject(project) {
  return new Project({
    name: project.name,
    description: project.description,
    project_manager: project.project_manager
  }).save();
}

function getProject(id) {
  return Project.where({ id }).fetch();
}

function getUsersAssociatedToProject(id) {
  return Project.where({ id })
    .fetch({ withRelated: ['user'] })
    .then((output) => output.user);
}

function updateProject(id, newDetails) {
  return User.where({ id }).save({
    name: newDetails.name,
    description: newDetails.description,
    project_manager: newDetails.project_manager
  });
}

function deleteProject(id) {
  return Project.where({ id }).destroy();
}

module.exports = {
  getAllProjects,
  getProjectsAssociatedToUser,
  createProject,
  getProject,
  getUsersAssociatedToProject,
  updateProject,
  deleteProject
};
