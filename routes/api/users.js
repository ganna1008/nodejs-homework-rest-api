const express = require('express');
const ctrl = require('../../controllers/users');

const {
  validateBody,
  existBody,
  existBodyVerifyEmail,
  authenticate,
  upload,
} = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', existBody(), validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post(
  '/verify',
  existBodyVerifyEmail(),
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);

router.post('/login', existBody(), validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/',
  authenticate,
  existBody(),
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),

  ctrl.updateAvatar
);

module.exports = router;
