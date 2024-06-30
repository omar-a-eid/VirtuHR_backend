// controllers/FeedbackController.ts
import { Request, Response } from 'express';
import FeedbackRepository from '../repositories/FeedbackRepository';
import FeedbackService from '../services/feedbackService';

const feedbackRepository = new FeedbackRepository();
const feedbackService = new FeedbackService(feedbackRepository);

export default class FeedbackController {
  public static async createFeedback(req: Request, res: Response) {
    try {
      const feedbackData = req.body;
      const newFeedback = await feedbackService.create(feedbackData);
      res.status(201).json(newFeedback);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getFeedbackById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feedback = await feedbackService.getById(Number(id));
      if (feedback) {
        res.status(200).json(feedback);
      } else {
        res.status(404).json({ error: 'Feedback not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async updateFeedback(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feedbackData = req.body;
      const updatedFeedback = await feedbackService.update(
        Number(id),
        feedbackData,
      );
      res.status(200).json(updatedFeedback);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async deleteFeedback(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await feedbackService.delete(Number(id));
      res.status(204).end();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
