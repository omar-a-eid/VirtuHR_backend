"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeRepository_1 = __importDefault(require("../repositories/EmployeeRepository"));
class EmployeeService {
    /*---------------------------UpdateEmployee-------------------------*/
    async getAllEmployees() {
        const employees = await EmployeeRepository_1.default.getAll();
        return employees;
    }
    /*---------------------------GetEmployeeById-------------------------*/
    async getEmployeesById(id) {
        const employees = await EmployeeRepository_1.default.getById(id);
        return employees;
    }
    /*---------------------------AddNewEmployee-------------------------*/
    async AddEmployee(employee) {
        try {
            const newEmployee = await EmployeeRepository_1.default.add(employee);
            return newEmployee;
        }
        catch (error) {
            console.error('Error creating employee:', error);
            return null;
        }
    }
    /*---------------------------UpdateEmployee-------------------------*/
    async UpdateEmployee(id, employee) {
        await EmployeeRepository_1.default.update(id, employee);
    }
}
exports.default = new EmployeeService();
