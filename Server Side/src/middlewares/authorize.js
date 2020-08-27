const { userRoles } = require('../constants');
const projectService = require('../services/projectService');
const taskService = require('../services/taskService');

const isAdmin = (req, res, next) => {
  //provide access only if the user is admin
  req.user.attributes.role === userRoles.admin
    ? next()
    : res.status(401).json({ message: 'Admin permission required' });
};

const isNotEngineer = (req, res, next) => {
  req.user.attributes.role === userRoles.engineer
    ? res.status(401).json({ message: 'Engineer cannot create tasks' })
    : next();
};

const isRespectivePMOrOther = (req, res, next) => {
  //provide access if the requesting user is project manager of that project
  if (req.user.attributes.role == userRoles.pm) {
    projectService.getProject(req.params.id).then((project) => {
      if (project.attributes.project_manager === req.user.attributes.id) {
        return next();
      } else {
        return res.status(401).json({ message: 'Permission denied' });
      }
    });
  } else {
    next();
  }
};

const isAdminOrOwner = (req, res, next) => {
  //provide access if the user is admin or resource is owned by the current user
  req.user.attributes.role === userRoles.admin
    ? next()
    : req.user.attributes.id === req.params.id
    ? next()
    : res.status(401).json({ message: 'Permission denied' });
};

const isAdminOrRespectivePM = (req, res, next) => {
  //provide access only if the user is admin or project manager of the requested project
  if (req.user.attributes.role === userRoles.admin) {
    return next();
  } else if (req.user.attributes.role === userRoles.pm) {
    projectService.getProject(req.params.id).then((project) => {
      if (project.attributes.project_manager === req.user.attributes.id) {
        return next();
      } else {
        return res.status(401).json({ message: 'Permission denied' });
      }
    });
  } else {
    return res.status(401).json({ message: 'Permission denied' });
  }
};

const hasTaskUpdatePermission = (req, res, next) => {
  if (req.user.attributes.role === userRoles.engineer) {
    taskService.getTask(req.params.id).then((task) => {
      if (task.attributes.assignee === req.user.attributes.id) {
        next();
      } else {
        return res.status(401).json({ message: "User doesn't have task update permission" });
      }
    });
  } else {
    next();
  }
};

module.exports = {
  isAdmin,
  isNotEngineer,
  isAdminOrOwner,
  isRespectivePMOrOther,
  isAdminOrRespectivePM,
  hasTaskUpdatePermission
};
