const router = require('express').Router(),
  authController = require('../controller/authController'),
  validation = require('../middlewares/validation');

router.post('/login', validation.validateRequestBody('userLogin'), authController.loginUser);

module.exports = router;
