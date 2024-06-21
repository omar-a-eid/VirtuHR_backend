"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Milesotne extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Goal, {
            foreignKey: 'goal_id',
            onDelete: 'CASCADE',
        });
    }
}
Milesotne.init({
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
        onDelete: 'CASCADE',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Milesotne',
    timestamps: true,
    underscored: true,
});
exports.default = Milesotne;
