import Announcement from '../db/models/announcement';
import BaseRepository from './BaseRepository';

export default class AnnouncementRepository extends BaseRepository<Announcement> {
  constructor() {
    super(Announcement);
  }
}
