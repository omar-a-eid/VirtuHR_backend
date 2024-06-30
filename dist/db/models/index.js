"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const basename = (0, path_1.basename)(__filename);
const db = {};
async function initializeModels() {
    try {
        const files = await (0, promises_1.readdir)(__dirname);
        for (const file of files) {
            if (file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.ts' &&
                file.indexOf('.test.ts') === -1) {
                const modelImport = await Promise.resolve(`${(0, path_1.join)(__dirname, file)}`).then(s => __importStar(require(s)));
                const model = modelImport.default;
                if (typeof model === 'function' && model.prototype instanceof sequelize_1.Model) {
                    db[model.name] = model;
                }
            }
        }
        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        db.sequelize = database_1.default;
        db.Sequelize = sequelize_1.Sequelize;
        console.log('Models initialized and associations set up.');
    }
    catch (error) {
        console.error('Error initializing models:', error);
    }
}
initializeModels();
exports.default = db;
