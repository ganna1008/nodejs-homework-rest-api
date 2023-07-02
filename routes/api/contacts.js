const express = require('express');
const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  existBody,
  existBodyFavorite,
  isValidId,
  authenticate,
} = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  existBody(),
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  existBodyFavorite(),
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
