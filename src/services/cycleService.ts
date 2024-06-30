import Cycle from '../db/models/cycle';
import CycleRepository from '../repositories/CycleRepository';
import BaseService from './baseService';

export default class CycleService extends BaseService<Cycle> {
  private cycleRepository: CycleRepository;

  constructor(cycleRepository: CycleRepository) {
    super(Cycle);
    this.cycleRepository = cycleRepository;
  }
}
