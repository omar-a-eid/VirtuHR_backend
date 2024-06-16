import Joi from 'joi';

const jobPostingSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  jobStatus: Joi.string().valid('archived', 'active').required().messages({
    'any.only': 'Job status must be one of "archived" or "active"',
    'any.required': 'Job status is required',
  }),
  hiringLeadId: Joi.number().integer().allow(null).messages({
    'number.base': 'Hiring lead ID must be a number',
  }),
  departmentId: Joi.number().integer().allow(null).messages({
    'number.base': 'Department ID must be a number',
  }),
  employmentType: Joi.string()
    .valid('full time', 'part time', 'freelance', 'internship')
    .required()
    .messages({
      'any.only':
        'Employment type must be one of "full time", "part time", "freelance", or "internship"',
      'any.required': 'Employment type is required',
    }),
  minimumExperience: Joi.number().integer().messages({
    'number.base': 'Minimum experience must be a number',
  }),
  compensation: Joi.number().integer().messages({
    'number.base': 'Compensation must be a number',
  }),
  description: Joi.string().messages({
    'string.base': 'Description must be a string',
  }),
  location: Joi.string().messages({
    'string.base': 'Location must be a string',
  }),
});

export default jobPostingSchema;
