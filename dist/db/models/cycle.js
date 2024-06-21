"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Cycle extends sequelize_1.Model {
    static associate(models) {
        this.belongsToMany(models.Employee, { through: 'employees_cycles' });
        this.hasOne(models.Feedback);
        this.hasOne(models.Assessment);
    }
}
Cycle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    period: {
        type: sequelize_1.DataTypes.STRING,
    },
    cycle_type: {
        type: sequelize_1.DataTypes.ENUM('interval', 'start_date'),
        validate: {
            isIn: [['interval', 'start_date']],
        },
    },
    includeAll: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Cycle',
    timestamps: true,
    underscored: true,
});
exports.default = Cycle;
