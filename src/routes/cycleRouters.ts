import express from 'express';
import CycleController from '../controllers/cycleController';

const router = express.Router();

router.post('/cycle', CycleController.createCycle);
router.get('/cycle/:id', CycleController.getCycleById);
router.put('/cycle/:id', CycleController.updateCycle);
router.delete('/cycle/:id', CycleController.deleteCycle);

export default router;
