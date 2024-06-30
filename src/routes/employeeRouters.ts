import express from 'express';
import EmployeeController from '../controllers/employeeController';
const router = express.Router();

router.get(
  '/employees/filterByPosition',
  EmployeeController.getEmployeesByPosition,
);

router.get('/employees', EmployeeController.getAll);
router.get('/employees/:id', EmployeeController.getEmployeesById);
router.get('/employees/loggedIn/:id', EmployeeController.getLoggedInUser);
router.post('/employees', EmployeeController.AddNewEmployee);
router.put('/employees/:id', EmployeeController.editEmployee);
router.delete('/employees/:id', EmployeeController.DeleteEmployee);

export default router;
