import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};
