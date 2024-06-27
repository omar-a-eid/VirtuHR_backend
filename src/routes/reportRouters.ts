import { Router } from 'express';
import ReportController from '../controllers/reportControllers';

const router = Router();

router.get('/reports', ReportController.getAllReports);
router.get('/reports/:id', ReportController.getReportById);
router.post('/reports', ReportController.createReport);

export default router;
