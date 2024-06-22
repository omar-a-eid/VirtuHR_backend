import { Router } from 'express';
import TerminationController from '../controllers/terminationController';

const router = Router();

router.get(
  '/terminated-employees',
  TerminationController.getAllTerminatedEmployees,
);

export default router;
