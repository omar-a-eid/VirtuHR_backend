import express from 'express';
import AssessmentController from '../controllers/assessmentController';

const router = express.Router();

router.post('/assessment', AssessmentController.createAssessment);
router.get('/assessment/:id', AssessmentController.getAssessmentById);
router.get('/assessment', AssessmentController.getAllAssessment);
router.put('/assessment/:id', AssessmentController.updateAssessment);
router.delete('/assessment/:id', AssessmentController.deleteAssessment);

export default router;
