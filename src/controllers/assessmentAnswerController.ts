import { Request, Response } from 'express';
import AssessmentAnswerRepository from '../repositories/AssessmentAnswerRepository';
import AssessmentAnswerService from '../services/assessmentAnswerService';

const assessmentAnswerRepository = new AssessmentAnswerRepository();
const assessmentAnswerService = new AssessmentAnswerService(
  assessmentAnswerRepository,
);

export default class AssessmentAnswerController {
  public static async getAll(req: Request, res: Response) {
    try {
      const assessmentAnswers = await assessmentAnswerService.getAll();
      res.status(200).json(assessmentAnswers);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessmentAnswer = await assessmentAnswerService.getById(
        Number(id),
      );
      if (assessmentAnswer) {
        res.status(200).json(assessmentAnswer);
      } else {
        res.status(404).json({ error: 'AssessmentAnswer not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getAssessmentAnswer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessmentAnswer =
        await assessmentAnswerService.getAssessmentAnswers(Number(id));
      if (assessmentAnswer) {
        res.status(200).json(assessmentAnswer);
      } else {
        res.status(404).json({ error: 'AssessmentAnswer not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getAssessmentAnswerForEmployee(
    req: Request,
    res: Response,
  ) {
    try {
      const { id } = req.params;
      const { employeeId } = req.query;

      const assessmentAnswer =
        await assessmentAnswerService.getAssessmentAnswersForEmployee(
          Number(id),
          Number(employeeId),
        );
      if (assessmentAnswer) {
        res.status(200).json(assessmentAnswer);
      } else {
        res.status(404).json({ error: 'AssessmentAnswer not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const assessmentAnswer = await assessmentAnswerService.create(data);
      res.status(201).json(assessmentAnswer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const assessmentAnswer = await assessmentAnswerService.update(
        Number(id),
        data,
      );
      if (assessmentAnswer) {
        res.status(200).json(assessmentAnswer);
      } else {
        res.status(404).json({ error: 'AssessmentAnswer not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessmentAnswer = await assessmentAnswerService.delete(Number(id));
      if (assessmentAnswer) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'AssessmentAnswer not found' });
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
