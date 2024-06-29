import express from 'express';

const router = express.Router();

import {
  checkIn,
  checkOut,
  getDailyHours,
  getMonthlyHours,
} from '../controllers/attendanceController';

router.post('/attendance/checkin', checkIn);
router.post('/attendance/checkout', checkOut);
router.get('/attendance/dailyhours', getDailyHours);
router.get('/attendance/monthlyhours', getMonthlyHours);

export default router;
