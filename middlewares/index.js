const validateBody = require('./validateBody');
const { existBody, existBodyFavorite, existBodyVerifyEmail } = require('./existBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateBody,
  existBody,
  isValidId,
  existBodyFavorite,
  authenticate,
  upload,
  existBodyVerifyEmail,
};
