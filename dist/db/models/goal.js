"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Goal extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'assigned_to',
            onDelete: 'SET NULL',
        });
        this.belongsToMany(models.Employee, { through: 'employees_goals' });
        this.hasMany(models.Comment);
        this.hasMany(models.Milestone);
    }
}
Goal.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    assignedTo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    note: {
        type: sequelize_1.DataTypes.TEXT,
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 100,
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Goal',
    timestamps: true,
    underscored: true,
});
exports.default = Goal;
