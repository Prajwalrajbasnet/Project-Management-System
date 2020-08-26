const router = require('express').Router(),
  projectController = require('../controller/projectController'),
  authorize = require('../middlewares/authorize');

//GET request for all projects
router.route('/').get(projectController.fetchAllProjects).post(authorize.isAdmin, projectController.newProject);

router
  .route('/:id')
  .get(projectController.fetchProject)
  .put(authorize.isAdmin, projectController.modifyProject)
  .delete(authorize.isAdmin, projectController.removeProject);

module.exports = router;
