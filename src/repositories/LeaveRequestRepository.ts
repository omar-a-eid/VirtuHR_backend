// repositories/LeaveRequestRepository.js
import LeaveRequest from '../db/models/leaverequest';
import Employee from '../db/models/employee';

class LeaveRequestRepository {
  async create(data: any): Promise<LeaveRequest> {
    console.log(data);
    return await LeaveRequest.create(data);
  }


  // async create(data: any): Promise<LeaveRequest> {
  //   console.log('Payload received in repository:', data); // Log the received payload

  //   // Convert date strings to Date objects if necessary
  //   const { startTime, endTime, ...rest } = data;
  //   const leaveRequestData = {
  //     ...rest,
  //     startTime: new Date(startTime),
  //     endTime: new Date(endTime),
  //   };

  //   console.log('Parsed leave request data:', leaveRequestData); // Log the parsed data

  //   return await LeaveRequest.create(leaveRequestData);
  // }

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
