import express from 'express';

const router = express.Router();

import {
  getAllEmployees,
  getEmployeesById,
  AddNewEmployee,
  editEmployee,
  DeleteEmployee,
  getEmployeesByPosition,
} from '../controllers/employeeControllers';

// to get -> Employee by Position with query parameter position=(Manager)
router.get('/employees/filterByPosition', getEmployeesByPosition);

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeesById);
router.post('/employees', AddNewEmployee);
router.put('/employees/:id', editEmployee);
router.delete('/employees/:id', DeleteEmployee);

export default router;
