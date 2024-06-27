import express from 'express';
import AuthController from '../controllers/authControllers';

const router = express.Router();

router.post('/signup', AuthController.signup);

export default router;
