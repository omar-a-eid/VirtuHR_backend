"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Termination extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
            onDelete: 'CASCADE',
        });
    }
}
Termination.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT,
    },
    employeeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Termination',
    timestamps: true,
    underscored: true,
});
exports.default = Termination;