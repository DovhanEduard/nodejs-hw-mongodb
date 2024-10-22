import express from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactSchemaPost,
  contactSchemaPatch,
} from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchemaPost),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(contactSchemaPatch),
  ctrlWrapper(updateContactController),
);

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;
