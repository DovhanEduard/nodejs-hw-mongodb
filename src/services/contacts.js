import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.where('userId').equals(userId);

    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }

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
    console.log(data);
    // return { data: contacts, ...paginationData };
    return { data, ...paginationData };
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId: userId });

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const updateContact = async (contactId, userId, contact) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId: userId }, contact, {
    new: true,
  });
};

export const deleteContact = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId: userId });
};
