"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const redis_1 = __importDefault(require("./config/redis"));
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await database_1.default.authenticate();
        console.log('Database connected successfully');
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
startServer();
redis_1.default.on('connect', () => {
    console.log('Connected to Redis');
});
redis_1.default.on('error', (err) => {
    console.error('Redis error:', err);
});
