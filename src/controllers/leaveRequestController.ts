// controllers/LeaveRequestController.ts
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import LeaveRequestService from '../services/leaveRequestService';

class LeaveRequestController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { startTime, endTime } = req.body;
      req.body.startTime = new Date(startTime).toISOString();
      req.body.endTime = new Date(endTime).toISOString();
      const leaveRequest = await LeaveRequestService.createLeaveRequest(
        req.body,
      );
      return res.status(201).json(leaveRequest);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(500).json({ error: error.errors });
      } else {
        return res.status(500).json({ error: error });
      }
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequest = await LeaveRequestService.getLeaveRequestById(
        Number(req.params.id),
      );
      if (!leaveRequest)
        return res.status(404).json({ error: 'LeaveRequest not found' });
      return res.json(leaveRequest);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(500).json({ error: error.errors });
      } else {
        return res.status(500).json({ error: error });
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequests = await LeaveRequestService.getAllLeaveRequests();
      return res.json(leaveRequests);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(500).json({ error: error.errors });
      } else {
        return res.status(500).json({ error: error });
      }
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const leaveRequest = await LeaveRequestService.updateLeaveRequest(
        Number(req.params.id),
        req.body,
      );
      return res.json(leaveRequest);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(500).json({ error: error.errors });
      } else {
        return res.status(500).json({ error: error });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await LeaveRequestService.deleteLeaveRequest(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(500).json({ error: error.errors });
      } else {
        return res.status(500).json({ error: error });
      }
    }
  }
}

export default new LeaveRequestController();
