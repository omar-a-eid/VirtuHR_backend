import express from 'express';
import GoalController from '../controllers/goalController';

const router = express.Router();

router.get('/goals/assignedTo/:id', GoalController.getByAssignedTo);
router.post('/goals/complete/:id', GoalController.setAsComplete);
router.delete('/goals/:id', GoalController.delete);
router.put('/goals/:id', GoalController.update);
router.post('/goals', GoalController.create);

export default router;
