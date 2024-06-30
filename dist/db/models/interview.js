"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Interview extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Applicant, {
            foreignKey: 'applicantId',
            onDelete: 'CASCADE',
        });
        this.belongsTo(models.Employee, {
            foreignKey: 'hiringManagerId',
            onDelete: 'SET NULL',
        });
    }
}
Interview.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    applicantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'applicants',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    interviewType: {
        type: sequelize_1.DataTypes.ENUM('on-site', 'online'),
        allowNull: false,
        validate: {
            isIn: [['on-site', 'online']],
        },
    },
    scheduledAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    interviewStatus: {
        type: sequelize_1.DataTypes.ENUM('scheduled', 'pending', 'in progress', 'completed', 'cancelled', 'rescheduled', 'no show'),
        allowNull: false,
        validate: {
            isIn: [
                [
                    'scheduled',
                    'pending',
                    'in progress',
                    'completed',
                    'cancelled',
                    'rescheduled',
                    'no show',
                ],
            ],
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    locationOrLink: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Interview',
    timestamps: true,
    underscored: true,
});
exports.default = Interview;
