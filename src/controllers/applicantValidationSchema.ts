// applicantValidation.js
import Joi from 'joi';

const applicantSchema = Joi.object({
  fullName: Joi.string().max(255).required().messages({
    'string.base': 'Full name should be a type of text',
    'string.empty': 'Full name is required',
    'any.required': 'Full name is required',
    'string.max': 'Full name must be less than or equal to 255 characters',
  }),
  email: Joi.string().email().max(255).required().messages({
    'string.email': 'Must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
    'string.max': 'Email must be less than or equal to 255 characters',
  }),
  phone: Joi.string()
    .max(50)
    .required()
    .pattern(/^[\d\-+\s]+$/)
    .messages({
      'string.pattern.base': 'Phone number must be valid',
      'string.max': 'Phone number must be less than or equal to 50 characters',
      'any.required': 'Phone number is required',
    }),
  // cvPath: Joi.string().max(255).required().messages({
  //   'string.empty': 'CV path is required',
  //   'any.required': 'CV path is required',
  //   'string.max': 'CV path must be less than or equal to 255 characters',
  // }),
  applicantStatus: Joi.string()
    .valid('applied', 'interviewing', 'hired', 'rejected')
    .required()
    .messages({
      'any.only':
        'Applicant status must be one of applied, interviewing, hired, or rejected',
      'any.required': 'Applicant status is required',
    }),
  jobId: Joi.number().integer().required().messages({
    'number.base': 'Job ID must be a number',
    'number.integer': 'Job ID must be an integer',
    'any.required': 'Job ID is required',
  }),
  coverLetter: Joi.string().allow(null).optional().messages({
    'string.empty': 'Cover letter must be a type of text',
    'string.max': 'Cover letter must be less than or equal to 65535 characters',
  }),
  university: Joi.string().allow(null).optional().messages({
    'string.max':
      'University name must be less than or equal to 255 characters',
  }),
  college: Joi.string().allow(null).optional().messages({
    'string.max': 'College name must be less than or equal to 255 characters',
  }),
  major: Joi.string().allow(null).optional().messages({
    'string.max': 'Major must be less than or equal to 255 characters',
  }),
  graduationDate: Joi.date().allow(null).optional().messages({
    'date.base': 'Graduation date must be a valid date',
  }),
});

export default applicantSchema;
