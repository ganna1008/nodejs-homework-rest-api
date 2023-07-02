const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;

// next(
//   HttpError(
//     400,
//     `missing required ${error.message.slice(1, error.message.lastIndexOf('"'))} field`
//   )
// );
