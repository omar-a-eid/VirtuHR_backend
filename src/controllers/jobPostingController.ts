import { Request, Response } from 'express';
import JobPostingService from '../services/jobPostingService';

// Get all job postings
export const getAllJobPostings = async (req: Request, res: Response) => {
  try {
    const jobPostings = await JobPostingService.getAllJobPostings();
    return res.json(jobPostings);
  } catch (error) {
    console.error('Error fetching all job postings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get job posting by ID
export const getJobPostingById = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }
  try {
    const jobPosting = await JobPostingService.getJobPostingById(jobPostingId);
    if (jobPosting) {
      return res.json(jobPosting);
    } else {
      return res
        .status(404)
        .json({ message: `Job posting ${jobPostingId} not found` });
    }
  } catch (error) {
    console.error(`Error fetching job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new job posting
export const createJobPosting = async (req: Request, res: Response) => {
  try {
    const newJobPosting = await JobPostingService.addJobPosting(req.body);
    return res.status(201).json(newJobPosting);
  } catch (error) {
    console.error('Error creating job posting:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing job posting
export const updateJobPosting = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }
  try {
    await JobPostingService.updateJobPosting(jobPostingId, req.body);
    return res.status(204).send();
  } catch (error) {
    console.error(`Error updating job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a job posting
export const deleteJobPosting = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }
  try {
    await JobPostingService.deleteJobPosting(jobPostingId);
    return res.status(204).send();
  } catch (error) {
    console.error(`Error deleting job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
