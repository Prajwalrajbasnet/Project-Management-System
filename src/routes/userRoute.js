const router = require('express').Router();
const userController = require('../controller/userController');

router.route('/').get(userController.fetchAllUsers);
router.post('/register', userController.registerUser);

router
  .route('/id/:id')
  .get(userController.fetchUserById)
  .put(userController.modifyUserById)
  .delete(userController.removeUserById);

module.exports = router;
