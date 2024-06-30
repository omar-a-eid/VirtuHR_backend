// controllers/AssessmentController.ts
import { Request, Response } from 'express';
import AssessmentRepository from '../repositories/AssessmentRepository';
import AssessmentService from '../services/assessmentService';

const assessmentRepository = new AssessmentRepository();
const assessmentService = new AssessmentService(assessmentRepository);

export default class AssessmentController {
  public static async createAssessment(req: Request, res: Response) {
    try {
      const assessmentData = req.body;
      const newAssessment = await assessmentService.create(assessmentData);
      res.status(201).json(newAssessment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getAssessmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await assessmentService.getById(Number(id));
      if (assessment) {
        res.status(200).json(assessment);
      } else {
        res.status(404).json({ error: 'Assessment not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getAllAssessment(req: Request, res: Response) {
    try {
      const assessments = await assessmentService.getAll();
      if (assessments.length > 0) {
        res.status(200).json(assessments);
      } else {
        res.status(404).json({ error: 'Assessment not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async updateAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessmentData = req.body;
      const updatedAssessment = await assessmentService.update(
        Number(id),
        assessmentData,
      );
      res.status(200).json(updatedAssessment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async deleteAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await assessmentService.delete(Number(id));
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
