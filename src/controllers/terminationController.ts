import { Request, Response } from 'express';
import terminationService from '../services/terminationService';

class TerminationController {
  async getAllTerminatedEmployees(req: Request, res: Response) {
    try {
      const employees = await terminationService.getAllTerminatedEmployees();
      res.status(200).json(employees);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default new TerminationController();
