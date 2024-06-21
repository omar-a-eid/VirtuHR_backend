import { Request, Response } from 'express';
import TerminationRepository from '../repositories/TerminationRepository';
import TerminationService from '../services/terminationService';

const terminationRepository = new TerminationRepository();
const terminationService = new TerminationService(terminationRepository);

export default class TerminationController {
  public static async getAllTerminatedEmployees(req: Request, res: Response) {
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
