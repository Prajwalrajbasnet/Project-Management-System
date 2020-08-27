const { route } = require('./authRoute');
const commentController = require('../controller/commentController');

const router = require('express').Router(),
  authorize = require('../middlewares/authorize'),
  validation = require('../middlewares/validation');

//GET & POST request for all comments
router.route('/').get(commentController.fetchAllCommentsForTask).post(commentController.newComment);

//requests specific to a single comment
router
  .route('/:id')
  .get(commentController.fetchComment)
  .put(commentController.modifyComment)
  .delete(commentController.removeComment);

module.exports = router;
