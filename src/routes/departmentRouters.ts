import express from 'express';
import DepartmentController from '../controllers/departmentController';

const router = express.Router();

// router.get('/departments/:id', DepartmentController.getById);
router.get('/departments/employees/:id', DepartmentController.getEmployees);

export default router;
