"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class FeedbackAnswer extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Feedback, {
            foreignKey: 'feedback_id',
            onDelete: 'CASCADE',
        });
        this.belongsTo(models.Employee, {
            as: 'feedbackReceiver',
            foreignKey: 'employee_id',
            onDelete: 'CASCADE',
        });
        this.belongsTo(models.Employee, {
            as: 'feedbackReviewer',
            foreignKey: 'reviewer_id',
            onDelete: 'CASCADE',
        });
    }
}
FeedbackAnswer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    feedbackId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'feedbacks',
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
    reviewerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id',
        },
    },
    answer: {
        type: sequelize_1.DataTypes.JSON,
        defaultValue: [],
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'FeedbackAnswer',
    timestamps: true,
    underscored: true,
});
exports.default = FeedbackAnswer;
