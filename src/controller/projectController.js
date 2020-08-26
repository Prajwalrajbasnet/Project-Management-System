const projectService = require('../services/projectService'),
  { userRoles } = require('../constants');

function fetchAllProjects(req, res, next) {
  if (req.user.attributes.role === userRoles.admin) {
    projectService
      .getAllProjects()
      .then((projectList) => res.json(projectList))
      .catch((err) => next(err));
  } else {
    try {
      const userId = req.user.attributes.id;
      console.log(userId);
      const projects = projectService.getProjectsAssociatedToUser(userId);
      res.json(projects);
    } catch (err) {
      next(err);
    }
  }
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
  projectService
    .updateProject(req.params.id, req.body)
    .then((project) => res.json(project))
    .catch((err) => next(err));
}

function removeProject(req, res, next) {
  projectService
    .deleteProject(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

module.exports = {
  fetchAllProjects,
  fetchProject,
  newProject,
  modifyProject,
  removeProject
};
