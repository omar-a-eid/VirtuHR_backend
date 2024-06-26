import express from 'express';
import applicantController from '../controllers/applicantController';
import { validateJobId } from '../middlewares/jobIdValidationMiddleware';

const router = express.Router();

router.get('/applicants', applicantController.getAllApplicants);
router.get('/applicants/:id', applicantController.getApplicantById);
router.post('/applicants', validateJobId, applicantController.addNewApplicant);
router.put('/applicants/:id', applicantController.updateApplicant);
router.delete('/applicants/:id', applicantController.deleteApplicant);
router.delete('/applicants/:id/soft', applicantController.softDeleteApplicant);

export default router;
