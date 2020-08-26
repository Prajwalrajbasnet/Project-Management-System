const Project = require('../model/projectModel');
const User = require('../model/userModel');
const ProjectUser = require('../model/projectusersModel');

function getAllProjects() {
  return Project.fetchAll();
}

function getProjectsAssociatedToUser(userId) {
  return User.where({ id: userId })
    .fetch({ withRelated: ['project'] })
    .then((output) => {
      return output.relations.project;
    })
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

function getProjectByName(name) {
  return Project.where({ name }).fetch();
}

function getUsersAssociatedToProject(id) {
  return Project.where({ id })
    .fetch({ withRelated: ['user'], require: true })
    .then((output) => output.relations.user)
    .catch((err) => {
      throw err;
    });
}

function newUserToProject(userId, projectId) {
  return new ProjectUser({
    project_id: projectId,
    user_id: userId
  }).save();
}

function updateProjectWithPM(id, newDetails) {
  return Project.where({ id }).save(
    {
      name: newDetails.name,
      description: newDetails.description,
      project_manager: newDetails.project_manager
    },
    {
      patch: true
    }
  );
}

function updateProject(id, newDetails) {
  return Project.where({ id }).save(
    {
      name: newDetails.name,
      description: newDetails.description
    },
    {
      patch: true
    }
  );
}

function deleteProject(id) {
  return Project.where({ id }).destroy();
}

module.exports = {
  getAllProjects,
  getProjectsAssociatedToUser,
  createProject,
  getProject,
  getProjectByName,
  getUsersAssociatedToProject,
  updateProjectWithPM,
  updateProject,
  deleteProject,
  newUserToProject
};
