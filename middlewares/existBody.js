const { HttpError } = require('../helpers');

const existBody = () => {
  const func = (req, res, next) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      next(HttpError(400, 'missing fields'));
    }
    next();
  };
  return func;
};

const existBodyVerifyEmail = () => {
  const func = (req, res, next) => {
    const body = req.body;
    if (!Object.keys(body).includes('email')) {
      next(HttpError(400, 'missing required field email'));
    }
    next();
  };
  return func;
};

const existBodyFavorite = () => {
  const func = (req, res, next) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      next(HttpError(400, 'missing field favorite'));
    }
    next();
  };
  return func;
};

module.exports = { existBody, existBodyFavorite, existBodyVerifyEmail };
