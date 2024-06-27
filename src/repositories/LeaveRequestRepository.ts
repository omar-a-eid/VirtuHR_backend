// repositories/LeaveRequestRepository.js
import LeaveRequest from '../db/models/leaverequest';
import Employee from '../db/models/employee';

class LeaveRequestRepository {
  async create(data: any): Promise<LeaveRequest> {
    return await LeaveRequest.create(data);
  }

  async findById(id: number): Promise<LeaveRequest | null> {
    return await LeaveRequest.findByPk(id);
  }

  async findAll(): Promise<LeaveRequest[]> {
    return await LeaveRequest.findAll({
      include: Employee,
    });
  }

  async update(id: number, data: any): Promise<LeaveRequest> {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) throw new Error('LeaveRequest not found');
    return await leaveRequest.update(data);
  }

  async delete(id: number): Promise<void> {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) throw new Error('LeaveRequest not found');
    await leaveRequest.destroy();
  }
}

export default new LeaveRequestRepository();
