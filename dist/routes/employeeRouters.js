"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employeeControllers_1 = require("../controllers/employeeControllers");
router.get('/employee', employeeControllers_1.getAllEmployees);
router.get('/employee/:id', employeeControllers_1.getEmployeesById);
router.post('/employee', employeeControllers_1.AddEmployee);
router.put('/employee/:id', employeeControllers_1.EditEmployee);
router.delete('/employee/:id', employeeControllers_1.DeleteEmployee);
exports.default = router;
