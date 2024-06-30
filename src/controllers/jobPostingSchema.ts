import Joi from 'joi';

const jobPostingSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  jobStatus: Joi.string()
    .valid('archived', 'active')
    .lowercase()
    .required()
    .messages({
      'any.only': 'Job status must be one of "archived" or "active"',
      'any.required': 'Job status is required',
    }),
  hiringLeadId: Joi.allow(null).messages({
    'string.base': 'Hiring lead must be a string',
  }),
  departmentId: Joi.allow(null).messages({
    'string.base': 'Department ID must be a string',
  }),
  employmentType: Joi.string()
    .valid('full time', 'part time', 'freelance', 'internship')
    .lowercase()
    .required()
    .messages({
      'any.only':
        'Employment type must be one of "full time", "part time", "freelance", or "internship"',
      'any.required': 'Employment type is required',
    }),
  minimumExperience: Joi.string().messages({
    'string.base': 'Minimum experience must be a string',
  }),
  compensation: Joi.number().integer().messages({
    'number.base': 'Compensation must be a number',
  }),
  description: Joi.string().messages({
    'string.base': 'Description must be a string',
  }),
  location: Joi.string().allow(null).messages({
    'string.base': 'Location must be a string',
  }),
  checkedIndex: Joi.number().integer().allow(null),
});

export default jobPostingSchema;
