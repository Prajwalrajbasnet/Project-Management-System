const router = require('express').Router();
const userController = require('../controller/userController'),
  validation = require('../middlewares/validation'),
  authorize = require('../middlewares/authorize');

router.route('/').get(userController.fetchAllUsers);
router.post(
  '/register',
  validation.validateRequestBody('userRegister'),
  authorize.isAdmin,
  userController.registerUser
);

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
