import { Request, Response } from 'express';
import JobPostingService from '../services/jobPostingService';
import jobPostingSchema from './jobPostingSchema';
import JobPostingRepository from '../repositories/JobPostingRepository';

const jobPostingRepository = new JobPostingRepository();
const jobPostingService = new JobPostingService(jobPostingRepository);
export default class jobPostingController {
  // Get all job postings
  public static async getAllJobPostings(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const jobPostings = await jobPostingService.getAll();
      if (jobPostings.length > 0) {
        // console.log(jobPostings);
        res.json(jobPostings);
      } else {
        res.status(404).json({ message: 'No JobPostings Found' });
      }
    } catch (error) {
      console.log('Error fetching all jobPostings', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get job posting by ID
  public static async getJobPostingById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const jobPostingId = parseInt(req.params.id, 10);
    if (isNaN(jobPostingId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
    }
    try {
      const jobPosting = await jobPostingService.getById(jobPostingId);

      if (jobPosting) {
        res.json(jobPosting);
      } else {
        res
          .status(404)
          .json({ message: `Job posting with ID ${jobPostingId} not found` });
      }
    } catch (error) {
      console.error(
        `Error fetching job posting with ID ${jobPostingId}:`,
        error,
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Create a new job posting

  public static async createJobPosting(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { error, value } = jobPostingSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({ errors: error.details });
      }

      // Extract hiringLeadId from validated data
      const { hiringLeadId, ...validatedData } = value;

      const newJobPosting = await jobPostingService.create({
        ...validatedData,
        hiringLeadId, // Ensure hiringLeadId is included
      });

      if (newJobPosting) {
        res.status(201).json(newJobPosting);
      } else {
        res.status(500).json({ error: 'Failed to create new jobPosting' });
      }
    } catch (error) {
      console.error('Error creating job posting:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update an existing job posting
  public static async updateJobPosting(
    req: Request,
    res: Response,
  ): Promise<void> {
    const jobPostingId = parseInt(req.params.id);
    if (isNaN(jobPostingId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
    }

    const { error, value } = jobPostingSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({ errors: error.details });
    }

    try {
      await jobPostingService.update(jobPostingId, value);
      res.status(200).json({ message: 'Job posting updated successfully' });
    } catch (error) {
      console.error(
        `Error updating job posting with ID ${jobPostingId}:`,
        error,
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Delete a job posting
  public static async deleteJobPosting(
    req: Request,
    res: Response,
  ): Promise<void> {
    const jobPostingId = parseInt(req.params.id);
    if (isNaN(jobPostingId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
    }
    try {
      await jobPostingService.delete(jobPostingId);
      res.status(200).json({
        message: `Job posting with ID ${jobPostingId} deleted successfully`,
      });
    } catch (error) {
      console.error(
        `Error deleting job posting with ID ${jobPostingId}:`,
        error,
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
