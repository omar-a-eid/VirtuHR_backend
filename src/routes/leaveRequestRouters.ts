// routes/leaveRequestRoutes.ts
import { Router } from 'express';
import LeaveRequestController from '../controllers/leaveRequestController';

const router = Router();

router.post('/leave-requests', LeaveRequestController.create);
router.get('/leave-requests/:id', LeaveRequestController.findById);
router.get('/leave-requests', LeaveRequestController.findAll);
router.put('/leave-requests/:id', LeaveRequestController.update);
router.delete('/leave-requests/:id', LeaveRequestController.delete);

export default router;
