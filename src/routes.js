const router = require('express').Router(),
  authRoute = require('./routes/authRoute'),
  userRoute = require('./routes/userRoute');
//GET request to root of API
router.get('/', (req, res) => {
  res.json({
    app: 'Project Management System',
    apiVersion: '1.0'
  });
});

router.get('/test', (req, res) => {
  res.send('test sucessfull');
});

//All types of request related to Authentication
router.use('/auth', authRoute);
router.use('/users', userRoute);

module.exports = router;
