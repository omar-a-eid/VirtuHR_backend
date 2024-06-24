"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const employeeRouters_1 = __importDefault(require("./routes/employeeRouters"));
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
        //write all the routes here
        this.app.use('/api', employeeRouters_1.default);
    }
}
exports.default = new App().app;
