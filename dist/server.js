"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import app from './app';
const database_1 = __importDefault(require("./config/database"));
const redis_1 = __importDefault(require("./config/redis"));
const employeeRouters_1 = __importDefault(require("./routes/employeeRouters"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', employeeRouters_1.default);
database_1.default
    .authenticate()
    .then(() => {
    console.log('Database connected successfully');
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
redis_1.default.on('connect', () => {
    console.log('Connected to Redis');
});
redis_1.default.on('error', (err) => {
    console.error('Redis error:', err);
});
