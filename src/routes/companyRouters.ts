import express from 'express';
import CompanyController from '../controllers/companyController';

const router = express.Router();

router.post('/company', CompanyController.signup);

export default router;
