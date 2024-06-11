"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class DaysOff extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.Employee);
    }
}
DaysOff.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sick: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    maternity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    holiday: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    personal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'DaysOff',
    timestamps: true,
    underscored: true,
});
exports.default = DaysOff;
