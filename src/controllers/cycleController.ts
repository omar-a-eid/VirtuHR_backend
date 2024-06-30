// controllers/CycleController.ts
import { Request, Response } from 'express';
import sequelize from '../config/database';
import AssessmentRepository from '../repositories/AssessmentRepository';
import CycleRepository from '../repositories/CycleRepository';
import FeedbackRepository from '../repositories/FeedbackRepository';
import AssessmentService from '../services/assessmentService';
import CycleService from '../services/cycleService';
import FeedbackService from '../services/feedbackService';

const cycleRepository = new CycleRepository();
const cycleService = new CycleService(cycleRepository);

const feedbackRepository = new FeedbackRepository();
const feedbackService = new FeedbackService(feedbackRepository);

const assessmentRepository = new AssessmentRepository();
const assessmentService = new AssessmentService(assessmentRepository);

export default class CycleController {
  public static async createCycle(req: Request, res: Response) {
    try {
      const { cycle, feedback, assessment, companyId } = req.body;

      console.log(req.body);
      const transaction = await sequelize.transaction();

      const cycleData = {
        name: cycle.cycleName,
        cycleType: cycle.reviewStart,
        companyId: companyId,
      };

      const newCycle = await cycleService.create(cycleData, { transaction });

      const { feedbackRepeat, feedbackDate, peer, upward } = feedback;

      if (peer) {
        const peerFeedbackData = {
          cycleId: newCycle.id,
          feedbackType: 'peer',
          questions: peer.questions,
          reminder: feedbackDate,
          repeat: feedbackRepeat,
        };
        await feedbackService.create(peerFeedbackData, { transaction });
      }

      if (upward) {
        const upwardFeedbackData = {
          cycleId: newCycle.id,
          feedbackType: 'upward',
          questions: upward.questions,
          reminder: feedbackDate,
          repeat: feedbackRepeat,
        };
        await feedbackService.create(upwardFeedbackData, { transaction });
      }

      if (assessment) {
        const {
          assessmentRepeat,
          managerAssessmentQuestions,
          selfAssessmentQuestions,
          assessmentStartDate,
        } = assessment;
        console.log(selfAssessmentQuestions);
        const assessmentData = {
          cycleId: newCycle.id,
          repeat: Number(assessmentRepeat),
          managerQuestions: managerAssessmentQuestions,
          selfQuestions: selfAssessmentQuestions,
          startDate: assessmentStartDate,
        };
        await assessmentService.create(assessmentData, { transaction });
      }

      await transaction.commit();

      res.status(201).json(newCycle);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getCycleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cycle = await cycleService.getById(Number(id));
      if (cycle) {
        res.status(200).json(cycle);
      } else {
        res.status(404).json({ error: 'Cycle not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async updateCycle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cycleData = req.body;
      const updatedCycle = await cycleService.update(Number(id), cycleData);
      res.status(200).json(updatedCycle);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async deleteCycle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await cycleService.delete(Number(id));
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
