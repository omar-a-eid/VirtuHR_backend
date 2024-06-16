import express from 'express';
import {
  addNewApplicant,
  deleteApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicant,
} from '../controllers/applicantController';
import { validateJobId } from '../middlewares/jobIdValidationMiddleware';

const router = express.Router();

router.get('/applicants', getAllApplicants);
router.get('/applicants/:id', getApplicantById);
router.post('/applicants', validateJobId, addNewApplicant);
router.put('/applicants/:id', updateApplicant);
router.delete('/applicants/:id', deleteApplicant);

export default router;
