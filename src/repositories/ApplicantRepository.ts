import Applicant from '../db/models/applicant';
import BaseRepository from './BaseRepository';

export default class ApplicantRepository extends BaseRepository<Applicant> {
  constructor() {
    super(Applicant);
  }
  async softDelete(id: number): Promise<number> {
    const [affectedCount] = await Applicant.update(
      { deletedAt: new Date() },
      { where: { id } },
    );
    return affectedCount;
  }
}
