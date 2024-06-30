"use strict";
// import express from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// import {
//   getAllEmployees,
//   getEmployeesById,
//   AddNewEmployee,
//   editEmployee,
//   DeleteEmployee,
//   getEmployeesByPosition,
// } from '../controllers/employeeControllers';
// // to get -> Employee by Position with query parameter position=(Manager)
// router.get('/employees/filterByPosition', getEmployeesByPosition);
// router.get('/employees', getAllEmployees);
// router.get('/employees/:id', getEmployeesById);
// router.post('/employees', AddNewEmployee);
// router.put('/employees/:id', editEmployee);
// router.delete('/employees/:id', DeleteEmployee);
// export default router;
const express_1 = __importDefault(require("express"));
const employeeController_1 = __importDefault(require("../controllers/employeeController"));
const router = express_1.default.Router();
// to get -> Employee by Position with query parameter position=(Manager)
router.get('/employees/filterByPosition', employeeController_1.default.getEmployeesByPosition);
router.get('/employees', employeeController_1.default.getAll);
router.get('/employees/:id', employeeController_1.default.getEmployeesById);
router.post('/employees', employeeController_1.default.AddNewEmployee);
router.put('/employees/:id', employeeController_1.default.editEmployee);
router.delete('/employees/:id', employeeController_1.default.DeleteEmployee);
exports.default = router;
