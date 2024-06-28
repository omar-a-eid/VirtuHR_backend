import { Request, Response } from 'express';
import AnnouncementRepository from '../repositories/AnnouncementsRepository';
import AnnouncementService from '../services/announcementsService';

// Initialize the repository and service
const announcementRepository = new AnnouncementRepository();
const announcementService = new AnnouncementService(announcementRepository);

export default class AnnouncementController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const announcements = await announcementService.getAll();
      res.status(200).json(announcements);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const announcement = await announcementService.getById(Number(id));
      if (announcement) {
        res.status(200).json(announcement);
      } else {
        res.status(404).json({ message: 'Announcement not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const announcementData = req.body;
      const newAnnouncement =
        await announcementService.create(announcementData);
      res.status(201).json(newAnnouncement);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const announcementData = req.body;
      const [updatedCount, updatedAnnouncements] =
        await announcementService.update(Number(id), announcementData);
      if (updatedCount > 0) {
        res.status(200).json(updatedAnnouncements[0]);
      } else {
        res.status(404).json({ message: 'Announcement not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await announcementService.delete(Number(id));
      if (deletedCount > 0) {
        res.status(200).json({ message: 'Announcement deleted successfully' });
      } else {
        res.status(404).json({ message: 'Announcement not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
