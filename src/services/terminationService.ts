import Termination from '../db/models/termination';
import TerminationRepository from '../repositories/TerminationRepository';
import BaseService from './baseService';

export default class TerminationService extends BaseService<Termination> {
  private terminationRepository: TerminationRepository;

  constructor(terminationRepository: TerminationRepository) {
    super(Termination);
    this.terminationRepository = terminationRepository;
  }

  async getAllTerminatedEmployees() {
    return await this.terminationRepository.getAllTerminations();
  }
}
