"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = __importDefault(require("../db/models/employee"));
class EmployeeRepository {
    async getAll() {
        return employee_1.default.findAll();
    }
    async getById(id) {
        return employee_1.default.findByPk(id);
    }
    async add(employeeData) {
        return employee_1.default.create(employeeData);
    }
    async update(id, employee) {
        await employee_1.default.update(employee, { where: { id } });
    }
    async delete(id, softDelete = true) {
        if (softDelete) {
            return await employee_1.default.destroy({ where: { id } }); // Soft delete
        }
        else {
            return await employee_1.default.destroy({ where: { id }, force: true }); // Hard delete
        }
    }
    // to get -> Employee by Position with query parameter position=(Manager)
    async getByPosition(position, name) {
        const query = { where: {} };
        if (name !== '') {
            const firstName = name?.split(' ')[0] ?? '';
            const lastName = name?.split(' ')[1] ?? '';
            query.where.firstName = firstName;
            if (lastName !== '') {
                query.where.lastName = lastName;
            }
        }
        if (position !== '') {
            query.where.position = position;
        }
        const employees = {
            employees: [],
            count: 0,
        };
        const { count, rows } = await employee_1.default.findAndCountAll(query);
        employees.employees = rows;
        employees.count = count;
        return employees;
    }
}
exports.default = new EmployeeRepository();
