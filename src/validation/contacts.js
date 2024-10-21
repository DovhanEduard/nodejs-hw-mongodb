import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'any.required': 'Contact name is required',
    'string.min': 'Name must be at least 3 characters long',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
