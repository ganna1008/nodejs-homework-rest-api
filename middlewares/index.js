const validateBody = require('./validateBody');
const { existBody, existBodyFavorite } = require('./existBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');

module.exports = {
  validateBody,
  existBody,
  isValidId,
  existBodyFavorite,
  authenticate,
};
