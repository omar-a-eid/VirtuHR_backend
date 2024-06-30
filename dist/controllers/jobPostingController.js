"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobPostingService_1 = __importDefault(require("../services/jobPostingService"));
const jobPostingSchema_1 = __importDefault(require("./jobPostingSchema"));
const JobPostingRepository_1 = __importDefault(require("../repositories/JobPostingRepository"));
const jobPostingRepository = new JobPostingRepository_1.default();
const jobPostingService = new jobPostingService_1.default(jobPostingRepository);
class jobPostingController {
    // Get all job postings
    static async getAllJobPostings(req, res) {
        try {
            const jobPostings = await jobPostingService.getAll();
            if (jobPostings.length > 0) {
                // console.log(jobPostings);
                res.json(jobPostings);
            }
            else {
                res.status(404).json({ message: 'No JobPostings Found' });
            }
        }
        catch (error) {
            console.log('Error fetching all jobPostings', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Get job posting by ID
    static async getJobPostingById(req, res) {
        const jobPostingId = parseInt(req.params.id, 10);
        if (isNaN(jobPostingId)) {
            res.status(400).json({ error: 'ID entered is not a number' });
        }
        try {
            const jobPosting = await jobPostingService.getById(jobPostingId);
            if (jobPosting) {
                res.json(jobPosting);
            }
            else {
                res
                    .status(404)
                    .json({ message: `Job posting with ID ${jobPostingId} not found` });
            }
        }
        catch (error) {
            console.error(`Error fetching job posting with ID ${jobPostingId}:`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Create a new job posting
    static async createJobPosting(req, res) {
        try {
            const { error, value } = jobPostingSchema_1.default.validate(req.body, {
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
            }
            else {
                res.status(500).json({ error: 'Failed to create new jobPosting' });
            }
        }
        catch (error) {
            console.error('Error creating job posting:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Update an existing job posting
    static async updateJobPosting(req, res) {
        const jobPostingId = parseInt(req.params.id);
        if (isNaN(jobPostingId)) {
            res.status(400).json({ error: 'ID entered is not a number' });
        }
        const { error, value } = jobPostingSchema_1.default.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            res.status(400).json({ errors: error.details });
        }
        try {
            await jobPostingService.update(jobPostingId, value);
            res.status(200).json({ message: 'Job posting updated successfully' });
        }
        catch (error) {
            console.error(`Error updating job posting with ID ${jobPostingId}:`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Delete a job posting
    static async deleteJobPosting(req, res) {
        const jobPostingId = parseInt(req.params.id);
        if (isNaN(jobPostingId)) {
            res.status(400).json({ error: 'ID entered is not a number' });
        }
        try {
            await jobPostingService.delete(jobPostingId);
            res.status(200).json({
                message: `Job posting with ID ${jobPostingId} deleted successfully`,
            });
        }
        catch (error) {
            console.error(`Error deleting job posting with ID ${jobPostingId}:`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = jobPostingController;
