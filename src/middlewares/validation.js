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

    case 'task':
      return [
        body('title', 'Task should have a valid title').exists().isString().escape().trim(),
        body('project_id', 'Task should be associated with a valid project id').exists().isInt(),
        body('assignee', 'Assignee should be a valid user').isInt().optional(),
        body('deadline', 'Deadline should be a valid date time')
          .matches(
            /^([+-]?d{4}(?!d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]d|0[1-9]|3[01]))?|W([0-4]d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]d|[12]d{2}|3([0-5]d|6[1-6])))([Ts]((([01]d|2[0-3])((:?)[0-5]d)?|24:?00)([.,]d+(?!:))?)?(\17[0-5]d([.,]d+)?)?([zZ]|([+-])([01]d|2[0-3]):?([0-5]d)?)?)?)?$/
          )
          .optional()
      ];
  }
};
