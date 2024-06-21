"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployee = exports.EditEmployee = exports.AddEmployee = exports.getEmployeesById = exports.getAllEmployees = void 0;
const employee_1 = __importDefault(require("../db/models/employee"));
const getAllEmployees = async (req, res) => {
    try {
        const employee = await employee_1.default.findAll();
        // if there are employees get them if not message no employees are found
        if (employee.length > 0) {
            console.log(employee);
            return res.json(employee);
        }
        else {
            return res.json({ message: 'No Employees found' });
        }
    }
    catch (error) {
        return res.status(500).send({ error: 'Internal Server Error!!' });
    }
};
exports.getAllEmployees = getAllEmployees;
const getEmployeesById = async (req, res) => {
    console.log(`Logic Here ${res} & ${req}`);
};
exports.getEmployeesById = getEmployeesById;
const AddEmployee = async (req, res) => {
    console.log(`Logic Here ${res} & ${req}`);
};
exports.AddEmployee = AddEmployee;
const EditEmployee = async (req, res) => {
    console.log(`Logic Here ${res} & ${req}`);
};
exports.EditEmployee = EditEmployee;
const DeleteEmployee = async (req, res) => {
    console.log(`Logic Here ${res} & ${req}`);
};
exports.DeleteEmployee = DeleteEmployee;
