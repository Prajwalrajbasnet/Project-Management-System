const { route } = require('./authRoute');

const router = require('express').Router(),
  taskController = require('../controller/taskController'),
  authorize = require('../middlewares/authorize'),
  validation = require('../middlewares/validation'),
  isAssignable = require('../middlewares/isAssignable');

//GET & POST request for all tasks
router
  .route('/')
  .get(authorize.isRespectivePMOrOther, taskController.fetchAllTasks)
  .post(authorize.isNotEngineer, validation.validateRequestBody('task'), taskController.newTask);

//requests specific to a single task
router
  .route('/:id')
  .get(taskController.fetchTask)
  .put(authorize.hasTaskUpdatePermission, validation.validateRequestBody('task'), taskController.modifyTask)
  .delete(authorize.isNotEngineer, taskController.removeTask);

//request to update assignee of the task
router.route('/:id/assign').put(isAssignable, taskController.assignTask);

//requests regarding the users tagged in  a single task
router
  .route('/:id/tags')
  .get(taskController.fetchTaggedUsers)
  //tag already registered user to task
  .post(taskController.tagUser);

module.exports = router;
