"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const employeeSchema = joi_1.default.object({
    firstName: joi_1.default.string().max(100).required().messages({
        'string.base': 'First name should be a type of text',
        'string.empty': 'First name is required',
        'any.required': 'First name is required',
        'string.max': 'First name must be less than or equal to 100 characters',
    }),
    lastName: joi_1.default.string().max(100).required().messages({
        'string.base': 'Last name should be a type of text',
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required',
        'string.max': 'Last name must be less than or equal to 100 characters',
    }),
    email: joi_1.default.string().email().max(255).required().messages({
        'string.email': 'Must be a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
        'string.max': 'Email must be less than or equal to 255 characters',
    }),
    image: joi_1.default.string().max(255).optional().allow(null).messages({
        'string.max': 'Image URL must be less than or equal to 255 characters',
    }),
    passowrd: joi_1.default.string(),
    phone: joi_1.default.string()
        .max(50)
        .optional()
        .pattern(/^[\d\-+\s]+$/)
        .messages({
        'string.pattern.base': 'Phone number must be valid',
        'string.max': 'Phone number must be less than or equal to 50 characters',
    }),
    position: joi_1.default.string().max(100).required().messages({
        'string.empty': 'Position is required',
        'any.required': 'Position is required',
        'string.max': 'Position must be less than or equal to 100 characters',
    }),
    departmentId: joi_1.default.number().integer().optional().allow(null).messages({
        'number.base': 'Department ID must be an integer',
    }),
    salary: joi_1.default.number().integer().min(0).required().messages({
        'number.base': 'Salary must be a number',
        'number.min': 'Salary must be greater than or equal to zero',
        'any.required': 'Salary is required',
    }),
    createdAt: joi_1.default.date().optional().messages({
        'date.base': 'Created At must be a valid date',
    }),
    updatedAt: joi_1.default.date().optional().messages({
        'date.base': 'Updated At must be a valid date',
    }),
    deletedAt: joi_1.default.date().optional().allow(null).messages({
        'date.base': 'Deleted At must be a valid date',
    }),
    gender: joi_1.default.string().valid('M', 'F').required().messages({
        'any.only': 'Gender must be either M or F',
        'string.empty': 'Gender is required',
        'any.required': 'Gender is required',
    }),
    hireDate: joi_1.default.date().optional().messages({
        'date.base': 'Hire Date must be a valid date',
    }),
    managerId: joi_1.default.number().integer().optional().allow(null).messages({
        'number.base': 'Manager ID must be an integer',
    }),
    location: joi_1.default.string().max(255).optional().messages({
        'string.max': 'Location must be less than or equal to 255 characters',
    }),
    daysOffId: joi_1.default.number().integer().optional().allow(null).messages({
        'number.base': 'Days Off ID must be an integer',
    }),
    employmentType: joi_1.default.string()
        .valid('full time', 'part time', 'freelance', 'internship')
        .required()
        .messages({
        'any.only': 'Employment type must be one of full time, part time, freelance, or internship',
        'string.empty': 'Employment type is required',
        'any.required': 'Employment type is required',
    }),
});
exports.default = employeeSchema;
