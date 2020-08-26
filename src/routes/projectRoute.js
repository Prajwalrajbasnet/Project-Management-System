const router = require('express').Router(),
  projectController = require('../controller/projectController'),
  authorize = require('../middlewares/authorize'),
  checkDuplicateProject = require('../middlewares/checkDuplicateProject');

//GET & POST request for all projects
router
  .route('/')
  .get(projectController.fetchAllProjects)
  .post(authorize.isAdmin, checkDuplicateProject, projectController.newProject);

//requests specific to a single project
router
  .route('/:id')
  .get(projectController.fetchProject)
  .put(authorize.isAdminOrRespectivePM, projectController.modifyProject)
  .delete(authorize.isAdmin, projectController.removeProject);

//requests regarding the users associated with a single project
router
  .route('/:id/users')
  .get(projectController.fetchAllUsersInProject)
  .post(authorize.isAdminOrRespectivePM, projectController.addUserToProject);

module.exports = router;
