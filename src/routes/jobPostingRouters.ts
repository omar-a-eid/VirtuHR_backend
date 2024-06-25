import express from 'express';
import jobPostingController from '../controllers/jobPostingController';

const router = express.Router();

router.get('/jobPostings', jobPostingController.getAllJobPostings);
router.get('/jobPosting/:id', jobPostingController.getJobPostingById);
router.post('/jobPosting', jobPostingController.createJobPosting);
router.put('/jobPosting/:id', jobPostingController.updateJobPosting);
router.delete('/jobPosting/:id', jobPostingController.deleteJobPosting);

export default router;
