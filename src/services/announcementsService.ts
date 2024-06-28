import Announcement from '../db/models/announcement';
import AnnouncementRepository from '../repositories/AnnouncementsRepository';
import BaseService from './baseService';

export default class AnnouncementService extends BaseService<Announcement> {
  private announcementRepository: AnnouncementRepository;

  constructor(announcementRepository: AnnouncementRepository) {
    super(Announcement);
    this.announcementRepository = announcementRepository;
  }
}
