const projectService = require('../services/projectService');

module.exports = (req, res, next) => {
  projectService
    .getProjectByName(req.body.name)
    .then((project) => {
      const available = project.length < 1 ? true : false;
      if (!available) {
        return next('Another project with same name already exists');
      }
      return next();
    })
    .catch((err) => {
      if (err.message === 'EmptyResponse') {
        return next();
      }
      return next(err);
    });
};
