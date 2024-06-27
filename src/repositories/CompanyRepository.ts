import Company from '../db/models/company';

import BaseRepository from './BaseRepository';

export default class CompanyRepository extends BaseRepository<Company> {
  constructor() {
    super(Company);
  }
}
