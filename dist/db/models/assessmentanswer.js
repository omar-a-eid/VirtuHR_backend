"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class AssessmentAnswer extends sequelize_1.Model {
    // the employeeId will be handled depending on the assessment type  (slef/manager)
    static associate(models) {
        this.belongsTo(models.Assessment, {
            foreignKey: 'assessment_id',
            onDelete: 'CASCADE',
        });
    }
}
AssessmentAnswer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    assessmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'assessments',
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    answerText: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'AssessmentAnswer',
    timestamps: true,
    underscored: true,
});
exports.default = AssessmentAnswer;
