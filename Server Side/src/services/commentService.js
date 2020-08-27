const Comment = require('../model/commentModel');
const User = require('../model/userModel');
const Task = require('../model/taskModel');

function getAllComments(id) {
  return Comment.where({ task_id: id })
    .fetchAll()
    .then((output) => output)
    .catch((err) => {
      throw err;
    });
}

function createComment(userId, input) {
  return new Comment({
    task_id: input.task_id,
    commented_by: userId,
    comment: input.comment
  }).save();
}

function getComment(id) {
  return Comment.where({ comment_id: id }).fetch();
}

function updateComment(id, input) {
  return Comment.where({ comment_id: id }).save(
    {
      comment: input.comment
    },
    {
      patch: true
    }
  );
}

function deleteComment(id) {
  return Comment.where({ comment_id: id }).destroy();
}

module.exports = {
  getAllComments,
  createComment,
  getComment,
  updateComment,
  deleteComment
};
