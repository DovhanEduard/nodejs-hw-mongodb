import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find();

    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    console.log(filter.isFavourite);

    if (filter.isFavourite) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, data] = await Promise.all([
      Contact.find().merge(contactsQuery).countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

    const paginationData = calculatePaginationData(
      contactsCount,
      page,
      perPage,
    );

    return { data, ...paginationData };
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
