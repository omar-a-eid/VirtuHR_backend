"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Announcement extends sequelize_1.Model {
    // for status we will use soft delete
    static associate(models) {
        this.belongsToMany(models.Employee, { through: 'announcements_send_to' });
        this.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
            as: 'author',
        });
    }
}
Announcement.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    employId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id',
        },
    },
    sendToAll: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Announcement',
    timestamps: true,
    paranoid: true,
    underscored: true,
});
exports.default = Announcement;
