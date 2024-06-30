import express from 'express';
import FeedbackController from '../controllers/feedbackController';

const router = express.Router();

router.post('/feedback', FeedbackController.createFeedback);
router.get('/feedback/:id', FeedbackController.getFeedbackById);
router.put('/feedback/:id', FeedbackController.updateFeedback);
router.delete('/feedback/:id', FeedbackController.deleteFeedback);

export default router;
