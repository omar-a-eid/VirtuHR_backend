import FeedbackRequest from '../db/models/feedbackRequest';
import DepartmentRepository from '../repositories/DepartmentRepository';

class FeedbackGenerator {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async generatePeerFeedbackRequests(cycleId: number, departmentId: number) {
    const departmentData =
      await this.departmentRepository.getEmployees(departmentId);
    const employees = departmentData?.departmentEmployees
      ? departmentData.departmentEmployees
      : [];

    for (const employee of employees) {
      const peers = employees.filter((e: any) => e.id !== employee.id);

      for (const peer of peers) {
        await FeedbackRequest.create({
          cycleId,
          fromEmployeeId: employee.id,
          toEmployeeId: peer.id,
          status: 'pending',
        });
      }
    }
  }

  async generateUpwardFeedbackRequests(cycleId: number, departmentId: number) {
    const departmentData =
      await this.departmentRepository.getEmployees(departmentId);
    const employees = departmentData?.departmentEmployees
      ? departmentData.departmentEmployees
      : [];

    for (const employee of employees) {
      const peers = employees.filter((e: any) => e.id !== employee.id);

      for (const peer of peers) {
        await FeedbackRequest.create({
          cycleId,
          fromEmployeeId: employee.id,
          toEmployeeId: peer.id,
          status: 'pending',
        });
      }
    }
  }
}

export default FeedbackGenerator;
