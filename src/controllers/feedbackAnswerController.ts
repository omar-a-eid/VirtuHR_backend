// controllers/FeedbackAnswerController.ts
import { Request, Response } from 'express';
import FeedbackAnswerRepository from '../repositories/FeedbackAnswerRepository';
import FeedbackAnswerService from '../services/feedbackAnswerService';

const feedbackAnswerRepository = new FeedbackAnswerRepository();
const feedbackAnswerService = new FeedbackAnswerService(
  feedbackAnswerRepository,
);

export default class FeedbackAnswerController {
  public static async createFeedbackAnswer(req: Request, res: Response) {
    try {
      const feedbackAnswerData = req.body;
      const newFeedbackAnswer =
        await feedbackAnswerService.create(feedbackAnswerData);
      res.status(201).json(newFeedbackAnswer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getFeedbackAnswerForEmployee(
    req: Request,
    res: Response,
  ) {
    try {
      const { id } = req.params;
      const feedbackAnswer =
        await feedbackAnswerService.getFeedbackAnswerForEmployee(Number(id));
      if (feedbackAnswer) {
        res.status(200).json(feedbackAnswer);
      } else {
        res.status(404).json({ error: 'FeedbackAnswer not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async updateFeedbackAnswer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feedbackAnswerData = req.body;
      const updatedFeedbackAnswer = await feedbackAnswerService.update(
        Number(id),
        feedbackAnswerData,
      );
      res.status(200).json(updatedFeedbackAnswer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async deleteFeedbackAnswer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await feedbackAnswerService.delete(Number(id));
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
