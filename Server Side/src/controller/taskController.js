const taskService = require('../services/taskService'),
  { validationResult } = require('express-validator'),
  { userRoles } = require('../constants');

function fetchAllTasks(req, res, next) {
  taskService
    .getAllTasks(req.query.project)
    .then((tasksList) => res.json(tasksList))
    .catch((err) => next(err));
}

function newTask(req, res, next) {
  taskService
    .createTask(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function fetchTask(req, res, next) {
  taskService
    .getTask(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => next(err));
}

function modifyTask(req, res, next) {
  taskService
    .updateTask(req.params.id, req.body)
    .then((task) => res.json(task))
    .catch((err) => {
      err.message = 'Error occured while updating task';
      err.statusCode = 500;
      next(err);
    });
}

function assignTask(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  taskService
    .getTask(req.params.id)
    .then((targetTask) => {
      const lastAssignee = targetTask ? targetTask.attributes.assignee : null;
      taskService
        .changeAssignee(req.params.id, req.body.userId, lastAssignee)
        .then((data) => res.json(data))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
}

function removeTask(req, res, next) {
  taskService
    .deleteTask(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function fetchTaggedUsers(req, res, next) {
  taskService
    .getTaggedUsersInTask(req.params.id)
    .then((usersList) => res.json(usersList))
    .catch((err) => next(err));
}

function tagUser(req, res, next) {
  taskService
    .tagnewUserToTask(req.body.userId, req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

module.exports = {
  fetchAllTasks,
  fetchTask,
  newTask,
  modifyTask,
  assignTask,
  removeTask,
  fetchTaggedUsers,
  tagUser
};
