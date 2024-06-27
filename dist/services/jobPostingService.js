"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPosting_1 = __importDefault(require("../repositories/JobPosting"));
class JobPostingService {
    async getAllJobPostings() {
        return await JobPosting_1.default.getAll();
    }
    async getJobPostingById(id) {
        return await JobPosting_1.default.getById(id);
    }
    async addJobPosting(jobPosting) {
        try {
            return await JobPosting_1.default.add(jobPosting);
        }
        catch (error) {
            console.error('Error creating job posting:', error);
            return null;
        }
    }
    async updateJobPosting(id, jobPosting) {
        await JobPosting_1.default.update(id, jobPosting);
    }
    async deleteJobPosting(id) {
        await JobPosting_1.default.delete(id);
    }
}
exports.default = new JobPostingService();
