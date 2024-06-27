"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobPosting = exports.updateJobPosting = exports.createJobPosting = exports.getJobPostingById = exports.getAllJobPostings = void 0;
const jobPostingService_1 = __importDefault(require("../services/jobPostingService"));
// Get all job postings
const getAllJobPostings = async (req, res) => {
    try {
        const jobPostings = await jobPostingService_1.default.getAllJobPostings();
        return res.json(jobPostings);
    }
    catch (error) {
        console.error('Error fetching all job postings:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllJobPostings = getAllJobPostings;
// Get job posting by ID
const getJobPostingById = async (req, res) => {
    const jobPostingId = parseInt(req.params.id);
    if (isNaN(jobPostingId)) {
        return res.status(400).json({ error: 'ID entered is not a number' });
    }
    try {
        const jobPosting = await jobPostingService_1.default.getJobPostingById(jobPostingId);
        if (jobPosting) {
            return res.json(jobPosting);
        }
        else {
            return res
                .status(404)
                .json({ message: `Job posting ${jobPostingId} not found` });
        }
    }
    catch (error) {
        console.error(`Error fetching job posting with ID ${jobPostingId}:`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getJobPostingById = getJobPostingById;
// Create a new job posting
const createJobPosting = async (req, res) => {
    try {
        const newJobPosting = await jobPostingService_1.default.addJobPosting(req.body);
        return res.status(201).json(newJobPosting);
    }
    catch (error) {
        console.error('Error creating job posting:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createJobPosting = createJobPosting;
// Update an existing job posting
const updateJobPosting = async (req, res) => {
    const jobPostingId = parseInt(req.params.id);
    if (isNaN(jobPostingId)) {
        return res.status(400).json({ error: 'ID entered is not a number' });
    }
    try {
        await jobPostingService_1.default.updateJobPosting(jobPostingId, req.body);
        return res.status(204).send();
    }
    catch (error) {
        console.error(`Error updating job posting with ID ${jobPostingId}:`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateJobPosting = updateJobPosting;
// Delete a job posting
const deleteJobPosting = async (req, res) => {
    const jobPostingId = parseInt(req.params.id);
    if (isNaN(jobPostingId)) {
        return res.status(400).json({ error: 'ID entered is not a number' });
    }
    try {
        await jobPostingService_1.default.deleteJobPosting(jobPostingId);
        return res.status(204).send();
    }
    catch (error) {
        console.error(`Error deleting job posting with ID ${jobPostingId}:`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteJobPosting = deleteJobPosting;
