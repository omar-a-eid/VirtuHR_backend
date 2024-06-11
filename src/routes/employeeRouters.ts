import express from 'express';

const router = express.Router();

import {
  getAllEmployees,
  getEmployeesById,
  AddEmployee,
  EditEmployee,
  DeleteEmployee,
} from '../controllers/employeeControllers';

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeesById);
router.post('/employees', AddEmployee);
router.put('/employees/:id', EditEmployee);
router.delete('/employees/:id', DeleteEmployee);

export default router;
