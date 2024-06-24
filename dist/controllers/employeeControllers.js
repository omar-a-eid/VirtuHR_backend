"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByPosition = exports.DeleteEmployee = exports.AddNewEmployee = exports.editEmployee = exports.getEmployeesById = exports.getAllEmployees = void 0;
const EmployeeRepository_1 = __importDefault(require("../repositories/EmployeeRepository"));
const employeeService_1 = __importDefault(require("../services/employeeService"));
const validationSchema_1 = __importDefault(require("./validationSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/*------------------------GetAllEmployee-----------------------*/
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService_1.default.getAllEmployees();
        if (employees.length > 0) {
            console.log(employees);
            return res.json(employees);
        }
        else {
            return res.status(404).json({ message: 'No Employees found' });
        }
    }
    catch (error) {
        console.error('Error fetching all employees:', error);
        return res.status(500).json({ error: 'Internal Server Error!!' });
    }
};
exports.getAllEmployees = getAllEmployees;
/*----------------------------GetEmployeeById-------------------------*/
const getEmployeesById = async (req, res) => {
    const EmployeeId = parseInt(req.params.id);
    if (isNaN(EmployeeId)) {
        return res.status(400).json({ error: `ID entered is Not a Number` });
    }
    const employee = await employeeService_1.default.getEmployeesById(EmployeeId);
    if (employee) {
        return res.json(employee);
    }
    else {
        return res
            .status(404)
            .json({ message: `Employee ${EmployeeId} is not Found` });
    }
};
exports.getEmployeesById = getEmployeesById;
/*----------------------------UpdateEmployee-------------------------*/
const editEmployee = async (req, res) => {
    const employeeId = parseInt(req.params.id, 10); // Changed variable name to camelCase
    if (isNaN(employeeId)) {
        return res.status(400).json({ error: 'ID entered is not a number' }); // Minor text change for consistency
    }
    const { error } = validationSchema_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(req.body.passowrd, saltRounds);
    const newEmployee = {
        ...req.body,
        // passowrd: hashedPassword,
    };
    try {
        await employeeService_1.default.UpdateEmployee(employeeId, newEmployee);
        return res.status(200).json({ message: 'Employee updated successfully' });
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: 'An error occurred while updating the employee' });
    }
};
exports.editEmployee = editEmployee;
// ------------------AddEmployees------------------------
const AddNewEmployee = async (req, res) => {
    try {
        const { error } = validationSchema_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(req.body.passowrd, saltRounds);
        const newEmployee = {
            ...req.body,
            passowrd: hashedPassword,
        };
        const employee = await employeeService_1.default.AddEmployee(newEmployee);
        if (employee) {
            return res.status(201).json(employee); // 201 Created
        }
        else {
            return res.status(500).json({ message: 'Failed to create employee' });
        }
    }
    catch (error) {
        console.error('Error adding new employee:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.AddNewEmployee = AddNewEmployee;
const DeleteEmployee = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        if (isNaN(employeeId)) {
            return res.status(400).json({ error: `ID entered is Not a Number` });
        }
        const softDelete = req.query.hard !== 'true';
        const deletedCount = await EmployeeRepository_1.default.delete(employeeId, softDelete);
        if (deletedCount === 0) {
            return res
                .status(404)
                .json({ message: `Employee with ID ${employeeId} not found` });
        }
        //the default behaviour of the delete function is the soft delete
        //but if you want to make hard delete send query string hard=true
        //we will handle this in front end isa
        const deleteType = softDelete ? 'soft' : 'hard';
        return res.status(200).json({
            message: `Employee with ID ${employeeId} ${deleteType} deleted successfully`,
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!!' });
    }
};
exports.DeleteEmployee = DeleteEmployee;
// to get -> Employee by Position with query parameter position=(Manager)
const getEmployeesByPosition = async (req, res) => {
    try {
        const position = req.query.position;
        const fullName = req.query.name;
        const employees = await EmployeeRepository_1.default.getByPosition(position ?? '', fullName ?? '');
        if (employees.count > 0) {
            return res.status(200).json(employees);
        }
        else {
            return res.status(404).json({
                message: `No employees found with name ${fullName ?? ''} position: ${position ?? 'All Employees'}`,
            });
        }
    }
    catch (error) {
        console.error('Error fetching employees by position:', error);
        return res.status(500).json({ error: 'Internal Server Error!!' });
    }
};
exports.getEmployeesByPosition = getEmployeesByPosition;
