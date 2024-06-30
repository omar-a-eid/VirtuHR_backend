"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jobPostingRouters_1 = __importDefault(require("./routes/jobPostingRouters"));
const applicantRouters_1 = __importDefault(require("./routes/applicantRouters"));
require("./db/models/index");
const AttendenceRouters_1 = __importDefault(require("./routes/AttendenceRouters"));
const authRouters_1 = __importDefault(require("./routes/authRouters"));
const departmentRouters_1 = __importDefault(require("./routes/departmentRouters"));
const employeeRouters_1 = __importDefault(require("./routes/employeeRouters"));
const leaveRequestRouters_1 = __importDefault(require("./routes/leaveRequestRouters"));
const reportRouters_1 = __importDefault(require("./routes/reportRouters"));
const terminationRouters_1 = __importDefault(require("./routes/terminationRouters"));
const multer_1 = __importDefault(require("multer"));
// Create a Multer instance with a destination folder for file uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' });
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //#region Middleware
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
        //#endregion
    }
    routes() {
        // Define routes
        this.app.use('/api', jobPostingRouters_1.default);
        this.app.use('/api', applicantRouters_1.default);
        this.app.use('/api', employeeRouters_1.default);
        this.app.use('/api', departmentRouters_1.default);
        this.app.use('/api', terminationRouters_1.default);
        this.app.use('/api', leaveRequestRouters_1.default);
        this.app.use('/api', reportRouters_1.default);
        this.app.use('/api', authRouters_1.default);
        this.app.use('/attendence', AttendenceRouters_1.default);
        // Define a POST route for file uploads using Multer middleware
        this.app.post('/upload', upload.single('file'), (req, res) => {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            res.json({ message: 'File uploaded successfully' });
        });
    }
}
exports.default = new App().app;
