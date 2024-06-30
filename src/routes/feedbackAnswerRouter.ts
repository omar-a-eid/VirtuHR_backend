import express from 'express';
import FeedbackAnswerController from '../controllers/feedbackAnswerController';

const router = express.Router();

router.post('/feedback-answer', FeedbackAnswerController.createFeedbackAnswer);
router.get(
  '/feedback-answer/:id',
  FeedbackAnswerController.getFeedbackAnswerForEmployee,
);
router.put(
  '/feedback-answer/:id',
  FeedbackAnswerController.updateFeedbackAnswer,
);
router.delete(
  '/feedback-answer/:id',
  FeedbackAnswerController.deleteFeedbackAnswer,
);

export default router;
