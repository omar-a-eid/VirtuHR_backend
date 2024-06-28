import Joi from 'joi';

const employeeSchema = Joi.object({
  firstName: Joi.string().max(100).required().messages({
    'string.base': 'First name should be a type of text',
    'string.empty': 'First name is required',
    'any.required': 'First name is required',
    'string.max': 'First name must be less than or equal to 100 characters',
  }),
  lastName: Joi.string().max(100).required().messages({
    'string.base': 'Last name should be a type of text',
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
    'string.max': 'Last name must be less than or equal to 100 characters',
  }),
  email: Joi.string().email().max(255).required().messages({
    'string.email': 'Must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
    'string.max': 'Email must be less than or equal to 255 characters',
  }),
  image: Joi.string().max(255).optional().allow(null).messages({
    'string.max': 'Image URL must be less than or equal to 255 characters',
  }),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required(),
  phone: Joi.string()
    .max(50)
    .optional()
    .pattern(/^[\d\-+\s]+$/)
    .messages({
      'string.pattern.base': 'Phone number must be valid',
      'string.max': 'Phone number must be less than or equal to 50 characters',
    }),
  position: Joi.string().max(100).required().messages({
    'string.empty': 'Position is required',
    'any.required': 'Position is required',
    'string.max': 'Position must be less than or equal to 100 characters',
  }),
  departmentId: Joi.number().integer().optional().allow(null).messages({
    'number.base': 'Department ID must be an integer',
  }),
  companyId: Joi.number().required(),
  salary: Joi.number().integer().min(0).required().messages({
    'number.base': 'Salary must be a number',
    'number.min': 'Salary must be greater than or equal to zero',
    'any.required': 'Salary is required',
  }),
  createdAt: Joi.date().optional().messages({
    'date.base': 'Created At must be a valid date',
  }),
  updatedAt: Joi.date().optional().messages({
    'date.base': 'Updated At must be a valid date',
  }),
  deletedAt: Joi.date().optional().allow(null).messages({
    'date.base': 'Deleted At must be a valid date',
  }),
  gender: Joi.string().valid('M', 'F').required().messages({
    'any.only': 'Gender must be either M or F',
    'string.empty': 'Gender is required',
    'any.required': 'Gender is required',
  }),
  hireDate: Joi.date().optional().messages({
    'date.base': 'Hire Date must be a valid date',
  }),
  managerId: Joi.number().integer().optional().allow(null).messages({
    'number.base': 'Manager ID must be an integer',
  }),
  location: Joi.string().max(255).optional().messages({
    'string.max': 'Location must be less than or equal to 255 characters',
  }),
  daysOffId: Joi.number().integer().optional().allow(null).messages({
    'number.base': 'Days Off ID must be an integer',
  }),
  employmentType: Joi.string()
    .valid('full time', 'part time', 'freelance', 'internship')
    .required()
    .messages({
      'any.only':
        'Employment type must be one of full time, part time, freelance, or internship',
      'string.empty': 'Employment type is required',
      'any.required': 'Employment type is required',
    }),
});

export default employeeSchema;

// import * as Joi from 'joi';

// export const employeeSchema = Joi.object({
//   firstName: Joi.string()
//     .regex(/^[a-zA-Z]+$/)
//     .min(4)
//     .max(20)
//     .required(),
//   lastName: Joi.string()
//     .regex(/^[a-zA-Z]+$/)
//     .min(3)
//     .max(20)
//     .required(),
//   email: Joi.string()
//     .email()
//     .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
//     .required(),
//   password: Joi.string()
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//     )
//     .required(),
//   gender: Joi.string().valid('M', 'F').required(),
//   phone: Joi.string()
//     .length(11)
//     .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
//     .required(),
//   position: Joi.string()
//     .valid('Manager', 'NewEmployee', 'HR Employee', 'IT Specialist')
//     .required(),
//   departmentId: Joi.number().required(),
//   companyId: Joi.number().required(),
//   salary: Joi.number().required(),
//   hireDate: Joi.date().required(),
//   managerId: Joi.number().required(),
//   location: Joi.string()
//     .regex(/^[a-zA-Z\s]+$/)
//     .required(),
//   employmentType: Joi.string()
//     .valid('full time', 'part time', 'freelance', 'internship')
//     .required(),
// });
