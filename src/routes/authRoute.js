const router = require('express').Router(),
  authController = require('../controller/authController');

router.post('/login', authController.loginUser);

module.exports = router;
