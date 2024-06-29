import express from 'express';
import CompanyController from '../controllers/companyController';

const router = express.Router();

router.get('/company/:id', CompanyController.getById);
router.post('/company', CompanyController.signup);

export default router;
