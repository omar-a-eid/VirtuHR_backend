import express from 'express';
import AnnouncementController from '../controllers/announcementController';

const router = express.Router();

router.get('/announcements', AnnouncementController.getAll);
router.get('/announcement/:id', AnnouncementController.getById);
router.post('/announcement', AnnouncementController.create);
router.put('/announcement/:id', AnnouncementController.update);
router.delete('/announcement/:id', AnnouncementController.delete);
export default router;
