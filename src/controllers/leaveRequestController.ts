// controllers/LeaveRequestController.ts
import { Request, Response } from 'express';
import LeaveRequestService from '../services/leaveRequestService';

class LeaveRequestController {
  
  async create(req: Request, res: Response): Promise<Response> {
    try {
      console.log('this is request body',req.body);
      const leaveRequest = await LeaveRequestService.createLeaveRequest(req.body);
      return res.status(201).json(leaveRequest);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequest = await LeaveRequestService.getLeaveRequestById(Number(req.params.id));
      if (!leaveRequest) return res.status(404).json({ error: 'LeaveRequest not found' });
      return res.json(leaveRequest);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequests = await LeaveRequestService.getAllLeaveRequests();
      return res.json(leaveRequests);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequest = await LeaveRequestService.updateLeaveRequest(Number(req.params.id), req.body);
      return res.json(leaveRequest);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await LeaveRequestService.deleteLeaveRequest(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new LeaveRequestController();
