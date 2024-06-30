import { Router } from 'express';
import AssessmentAnswerController from '../controllers/assessmentAnswerController';

const router = Router();

router.get('/assessment-answers', AssessmentAnswerController.getAll);
router.get(
  '/assessment-answers/:id',
  AssessmentAnswerController.getAssessmentAnswer,
);
router.get(
  '/assessment-answers-employee/:id',
  AssessmentAnswerController.getAssessmentAnswerForEmployee,
);
router.post('/assessment-answers', AssessmentAnswerController.create);
router.put('/assessment-answers/:id', AssessmentAnswerController.update);
router.delete('/assessment-answers/:id', AssessmentAnswerController.delete);

export default router;
