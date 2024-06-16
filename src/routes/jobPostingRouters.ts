import express from 'express';
import {
  createJobPosting,
  deleteJobPosting,
  getAllJobPostings,
  getJobPostingById,
  updateJobPosting,
} from '../controllers/jobPostingController';

const router = express.Router();

router.get('/jobPostings', getAllJobPostings);
router.get('/jobPosting/:id', getJobPostingById);
router.post('/jobPosting', createJobPosting);
router.put('/jobPosting/:id', updateJobPosting);
router.delete('/jobPosting/:id', deleteJobPosting);

export default router;
