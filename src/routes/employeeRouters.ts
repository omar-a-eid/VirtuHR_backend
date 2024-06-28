// import express from 'express';

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

import express from 'express';
import EmployeeController from '../controllers/employeeController';
const router = express.Router();

// to get -> Employee by Position with query parameter position=(Manager)

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
