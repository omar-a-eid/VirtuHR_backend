import Company from '../db/models/company';
import CompanyRepository from '../repositories/CompanyRepository';
import BaseService from './baseService';

export default class CompanyService extends BaseService<Company> {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    super(Company);
    this.companyRepository = companyRepository;
  }
}
