import express from 'express';
import applicantController from '../controllers/applicantController';
import { validateJobId } from '../middlewares/jobIdValidationMiddleware';
import upload from '../multerConfig';

const router = express.Router();

router.get('/applicants', applicantController.getAllApplicants);
router.get('/applicants/:id', applicantController.getApplicantById);
router.get('/applicants/:id/cv', applicantController.downloadApplicantCV);
router.post(
  '/applicants',
  upload.single('cv'),
  validateJobId,
  applicantController.addNewApplicant,
);
router.put('/applicants/:id', applicantController.updateApplicant);
router.delete('/applicants/:id', applicantController.deleteApplicant);
router.delete('/applicants/:id/soft', applicantController.softDeleteApplicant);

export default router;
