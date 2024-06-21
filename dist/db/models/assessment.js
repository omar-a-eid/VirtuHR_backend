"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Assessment extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Cycle, {
            foreignKey: 'cycle_id',
            onDelete: 'CASCADE',
        });
        this.hasMany(models.AssessmentAnswer);
    }
}
Assessment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cycleId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'cycles',
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    questions: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    questionType: {
        type: sequelize_1.DataTypes.ENUM('self', 'manager'),
        allowNull: false,
        validate: {
            isIn: [['self', 'manager']],
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Assessment',
    timestamps: true,
    underscored: true,
});
exports.default = Assessment;
