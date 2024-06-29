// services/LeaveRequestService.ts
import LeaveRequest from '../db/models/leaverequest';
import LeaveRequestRepository from '../repositories/LeaveRequestRepository';

class LeaveRequestService {
  async createLeaveRequest(data: any): Promise<LeaveRequest> {
    return await LeaveRequestRepository.create(data);
  }

  async getLeaveRequestById(id: number): Promise<LeaveRequest | null> {
    return await LeaveRequestRepository.findById(id);
  }

  async getAllLeaveRequests(): Promise<LeaveRequest[]> {
    return await LeaveRequestRepository.findAll();
  }

  async updateLeaveRequest(id: number, data: any): Promise<LeaveRequest> {
    return await LeaveRequestRepository.update(id, data);
  }

  async deleteLeaveRequest(id: number): Promise<void> {
    return await LeaveRequestRepository.delete(id);
  }
}

export default new LeaveRequestService();
