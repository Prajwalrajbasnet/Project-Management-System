const { body } = require('express-validator');
//sanitize and validate input parameters
exports.validateRequestBody = (option) => {
  const credentialsValidate = [
    body('username', 'Username is required').exists().notEmpty().escape(),
    body('password', 'Password should be of minimum 8 characters').exists().isLength({ min: 8 })
  ];
  switch (option) {
    case 'userLogin':
      return credentialsValidate;

    case 'userRegister':
      return [
        ...credentialsValidate,
        body('email', 'Invalid Email').exists().isEmail().normalizeEmail(),
        body('fname', 'First name is required').exists().isString().escape().trim(),
        body('lname', 'Last name is required').exists().isString().escape().trim(),
        body('role', 'This is not a valid role').isIn(['team lead', 'project manager', 'engineer'])
      ];

    case 'userUpdate':
      return [
        body('email', 'Invalid Email').isEmail().normalizeEmail(),
        body('fname', 'First name is required').isString().escape().trim(),
        body('lname', 'Last name is required').isString().escape().trim(),
        body('role', 'This is not a valid role').isIn(['team lead', 'project manager', 'engineer']).optional()
      ];
    case 'passwordUpdate':
      return [
        body('previousPassword', 'Password should be of minimum 8 characters').exists().isLength({ min: 8 }),
        body('newPassword', 'Password should be of minimum 8 characters').exists().isLength({ min: 8 })
      ];
  }
};
