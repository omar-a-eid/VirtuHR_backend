import { Router } from 'express';
import terminationController from '../controllers/terminationController';

const router = Router();

router.get(
  '/terminated-employees',
  terminationController.getAllTerminatedEmployees,
);

export default router;
