import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import GoalRepository from '../repositories/GoalRepository';
import GoalService from '../services/goalService';

const goalRepository = new GoalRepository();
const goalService = new GoalService(goalRepository);

class GoalController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const goals = await goalService.getAll();
      res.status(200).json(goals);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const goal = await goalService.getById(Number(id));
      if (goal) {
        res.status(200).json(goal);
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const goalData = req.body;
      const newGoal = await goalService.create(goalData);
      res.status(201).json(newGoal);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const goalData = req.body;
      const [updatedCount, updatedGoals] = await goalService.update(
        Number(id),
        goalData,
      );
      if (updatedCount > 0) {
        res.status(200).json(updatedGoals[0]);
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await goalService.delete(Number(id));
      if (deletedCount > 0) {
        res.status(200).json({ message: 'Goal deleted successfully' });
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async getByAssignedTo(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const goals = await goalService.getEmployeeGoals(Number(id));
      res.status(200).json(goals);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }

  public static async setAsComplete(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await goalService.setAsComplete(Number(id));
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }
}

export default GoalController;
