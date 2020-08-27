const commentService = require('../services/commentService'),
  { validationResult } = require('express-validator'),
  { userRoles } = require('../constants');

function fetchAllCommentsForTask(req, res, next) {
  commentService
    .getAllComments(req.query.task)
    .then((commentList) => res.json(commentList))
    .catch((err) => next(err));
}

function newComment(req, res, next) {
  commentService
    .createComment(req.user.attributes.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function fetchComment(req, res, next) {
  commentService
    .getComment(req.params.id)
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
}

function modifyComment(req, res, next) {
  commentService
    .updateComment(req.params.id, req.body)
    .then((task) => res.json(task))
    .catch((err) => {
      err.message = 'Error occured while updating comment';
      err.statusCode = 500;
      next(err);
    });
}

function removeComment(req, res, next) {
  commentService
    .deleteComment(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

module.exports = {
  fetchAllCommentsForTask,
  fetchComment,
  newComment,
  modifyComment,
  removeComment
};
