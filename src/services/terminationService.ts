import terminationRepository from '../repositories/TerminationRepository';

class TerminationService {
  async getAllTerminatedEmployees() {
    const terminations = await terminationRepository.getAllTerminations();
    return terminations.map((termination: any) => termination.employee);
  }
}

export default new TerminationService();
