"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Feedback extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Cycle, {
            foreignKey: 'cycle_id',
            onDelete: 'CASCADE',
        });
        this.hasMany(models.FeedbackAnswer);
    }
}
Feedback.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cycleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cycles',
            key: 'id',
        },
    },
    feedbackType: {
        type: sequelize_1.DataTypes.ENUM('upward', 'peer'),
        allowNull: false,
        validate: {
            isIn: [['upward', 'peer']],
        },
    },
    questions: {
        type: sequelize_1.DataTypes.JSON,
        defaultValue: [],
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Feedback',
    timestamps: true,
    underscored: true,
});
exports.default = Feedback;
