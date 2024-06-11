"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Comment extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Goal, {
            foreignKey: 'goal_id',
            onDelete: 'CASCADE',
        });
        this.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
            onDelete: 'SET NULL',
        });
    }
}
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    goalId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'goals',
            key: 'id',
        },
    },
    employeeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id',
        },
    },
    commentText: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Comment',
    timestamps: true,
    underscored: true,
});
exports.default = Comment;
