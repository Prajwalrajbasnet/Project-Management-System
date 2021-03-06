const router = require('express').Router();
const userController = require('../controller/userController'),
  validation = require('../middlewares/validation'),
  checkDuplicateUsername = require('../middlewares/checkDuplicateUsername'),
  checkDuplicateEmail = require('../middlewares/checkDuplicateEmail'),
  authorize = require('../middlewares/authorize');

router.route('/').get(userController.fetchAllUsers);
router.post(
  '/register',
  validation.validateRequestBody('userRegister'),
  authorize.isAdmin,
  checkDuplicateUsername,
  checkDuplicateEmail,
  userController.registerUser
);

router.get('/current', userController.fetchCurrentUser);

router
  .route('/id/:id')
  .get(userController.fetchUserById)
  .put(validation.validateRequestBody('userUpdate'), authorize.isAdminOrOwner, userController.modifyUserById)
  .delete(authorize.isAdmin, userController.removeUserById);

router.put(
  '/id/:id/credential',
  validation.validateRequestBody('passwordUpdate'),
  authorize.isAdminOrOwner,
  userController.changePassword
);

module.exports = router;
