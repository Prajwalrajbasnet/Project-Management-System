const projectService = require('../services/projectService'),
  { userRoles } = require('../constants');

function fetchAllProjects(req, res, next) {
  if (req.user.attributes.role === userRoles.admin) {
    projectService
      .getAllProjects()
      .then((projectList) => res.json(projectList))
      .catch((err) => next(err));
  } else {
    const userId = req.user.attributes.id;
    projectService
      .getProjectsAssociatedToUser(userId)
      .then((projects) => res.json(projects))
      .catch((err) => next(err));
  }
}

function fetchAllUsersInProject(req, res, next) {
  projectService
    .getUsersAssociatedToProject(req.params.id)
    .then((usersList) => res.json(usersList))
    .catch((err) => next(err));
}

function addUserToProject(req, res, next) {
  projectService
    .newUserToProject(req.body.userId, req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function newProject(req, res, next) {
  projectService
    .createProject(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function fetchProject(req, res, next) {
  projectService
    .getProject(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => next(err));
}

function modifyProject(req, res, next) {
  if (req.user.attributes.role === userRoles.admin) {
    projectService
      .updateProjectWithPM(req.params.id, req.body)
      .then((project) => res.json(project))
      .catch((err) => {
        err.message = 'Error occured while modifying project';
        err.statusCode = 500;
        next(err);
      });
  } else {
    projectService
      .updateProject(req.params.id, req.body)
      .then((project) => res.json(project))
      .catch((err) => {
        err.message = 'Error occured while modifying project';
        err.statusCode = 500;
        next(err);
      });
  }
}

function removeProject(req, res, next) {
  projectService
    .deleteProject(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

module.exports = {
  fetchAllProjects,
  fetchAllUsersInProject,
  addUserToProject,
  fetchProject,
  newProject,
  modifyProject,
  removeProject
};
