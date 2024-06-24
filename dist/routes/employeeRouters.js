"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employeeControllers_1 = require("../controllers/employeeControllers");
// to get -> Employee by Position with query parameter position=(Manager)
router.get('/employees/filterByPosition', employeeControllers_1.getEmployeesByPosition);
router.get('/employees', employeeControllers_1.getAllEmployees);
router.get('/employees/:id', employeeControllers_1.getEmployeesById);
router.post('/employees', employeeControllers_1.AddNewEmployee);
router.put('/employees/:id', employeeControllers_1.editEmployee);
router.delete('/employees/:id', employeeControllers_1.DeleteEmployee);
exports.default = router;
