"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobposting_1 = __importDefault(require("../db/models/jobposting"));
const baseService_1 = __importDefault(require("./baseService"));
class JobPostingService extends baseService_1.default {
    constructor(jobPostingRepository) {
        super(jobposting_1.default);
        this.jobPostingRepository = jobPostingRepository;
    }
}
exports.default = JobPostingService;
