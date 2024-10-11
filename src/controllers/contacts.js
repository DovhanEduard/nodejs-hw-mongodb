import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export async function getAllContactsController(req, res) {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (contact === null) {
    return next(createHttpError(404, 'Contact no found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}
