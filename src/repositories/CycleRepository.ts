// repositories/ReviewRepository.ts
import Cycle from '../db/models/cycle';
import BaseRepository from './BaseRepository';

export default class ReviewRepository extends BaseRepository<Cycle> {
  constructor() {
    super(Cycle);
  }
}
