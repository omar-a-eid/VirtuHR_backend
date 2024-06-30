import { Router } from 'express';
import DepartmentController from '../controllers/departmentController';

const router = Router();

router.get('/departments', DepartmentController.getAll);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.create);
router.put('/departments/:id', DepartmentController.update);
router.delete('/departments/:id', DepartmentController.delete);

export default router;
