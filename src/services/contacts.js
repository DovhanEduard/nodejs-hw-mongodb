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

export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const updateContact = async (contactId, contact) => {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
