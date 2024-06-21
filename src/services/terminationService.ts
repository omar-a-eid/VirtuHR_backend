import terminationRepository from '../repositories/TerminationRepository';

class TerminationService {
  async getAllTerminatedEmployees() {
    const terminations = await terminationRepository.getAllTerminations();
    return terminations;
  }
}

export default new TerminationService();
