import express from 'express';

const router = express.Router();

import {
  checkIn,
  checkOut,
  getDailyHours,
  getMonthlyHours,
} from '../controllers/attendanceController';

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/dailyhours', getDailyHours);
router.get('/monthlyhours', getMonthlyHours);

export default router;
