const Task = require('../model/taskModel');
const User = require('../model/userModel');
const Project = require('../model/projectModel');
const Tags = require('../model/tagsModel');

function getAllTasks(id) {
  return Project.where({ id })
    .fetch({ withRelated: ['task'] })
    .then((output) => output.relations.task)
    .catch((err) => {
      throw err;
    });
}

function createTask(task) {
  return new Task({
    title: task.title,
    description: task.description || null,
    deadline: task.deadline || null,
    project_id: task.project_id,
    assignee: task.assignee || null,
    last_assignee: task.last_assignee || null
  }).save();
}

function getTask(id) {
  return Task.where({ task_id: id }).fetch();
}

function getTaggedUsersInTask(id) {
  return Tags.where({ task_id: id })
    .fetchAll({
      withRelated: [
        {
          user: function (qb) {
            qb.select('id', 'fname', 'lname', 'email', 'username');
          }
        }
      ],
      require: true
    })
    .then((output) => {
      console.log(output);
      return output;
    })
    .catch((err) => {
      throw err;
    });
}

function tagnewUserToTask(userId, taskId) {
  return new Tags({
    task_id: taskId,
    user_id: userId
  }).save();
}

function updateTask(id, newTaskDetails) {
  return Task.where({ task_id: id }).save(
    {
      title: newTaskDetails.title,
      description: newTaskDetails.description,
      deadline: newTaskDetails.deadline
    },
    {
      patch: true
    }
  );
}

function changeAssignee(id, newAssignee, oldAssignee) {
  return Task.where({ task_id: id }).save(
    {
      last_assignee: oldAssignee,
      assignee: newAssignee
    },
    {
      patch: true
    }
  );
}

function deleteTask(id) {
  return Task.where({ task_id: id }).destroy();
}

module.exports = {
  getAllTasks,
  getTask,
  getTaggedUsersInTask,
  tagnewUserToTask,
  createTask,
  updateTask,
  changeAssignee,
  deleteTask
};
