"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Department extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'managerId',
            as: 'managedDepartment',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.Division, {
            foreignKey: 'divisionId',
            onDelete: 'SET NULL',
        });
        this.hasMany(models.Employee, {
            foreignKey: 'departmentId',
            as: 'departmentEmployees',
            onDelete: 'SET NULL',
        });
        this.hasMany(models.JobPosting);
    }
}
Department.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    managerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employees',
            key: 'id',
        },
    },
    divisionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'divisions',
            key: 'id',
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Department',
    timestamps: true,
    underscored: true,
});
exports.default = Department;
