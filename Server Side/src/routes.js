const router = require('express').Router(),
  authRoute = require('./routes/authRoute'),
  userRoute = require('./routes/userRoute'),
  projectsRoute = require('./routes/projectRoute'),
  tasksRoute = require('./routes/taskRoute'),
  commentRoute = require('./routes/commentRoute'),
  authenticate = require('./middlewares/authenticate');
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

//users route
router.use('/users', authenticate, userRoute);

//projects route
router.use('/projects', authenticate, projectsRoute);

//tasks route
router.use('/tasks', authenticate, tasksRoute);

//comments route
router.use('/comments', authenticate, commentRoute);

module.exports = router;
