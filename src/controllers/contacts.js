import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
}

export async function getContactByIdController(req, res, next) {
  const { id } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(id, userId);

  if (contact === null) {
    return next(createHttpError(404, 'Contact no found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function createContactController(req, res, next) {
  const photo = req.file;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email || null,
    isFavourite: req.body.isFavourite || false,
    contactType: req.body.contactType,
    userId: req.user.id,
  };

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await createContact({ ...contact, photo: photoUrl });

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function updateContactController(req, res, next) {
  const { id } = req.params;
  const photo = req.file;
  const userId = req.user._id;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(id, userId, {
    ...contact,
    photo: photoUrl,
  });

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await deleteContact(id, userId);

  if (result === null) {
    return next(createHttpError(404, 'Contact no found'));
  }

  res.status(204).end();
}
