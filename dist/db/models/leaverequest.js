"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class LeaveRequest extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
            onDelete: 'CASCADE',
        });
    }
}
LeaveRequest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    startTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('rejected', 'accepted', 'pending'),
        allowNull: false,
        validate: {
            isIn: [['rejected', 'accepted', 'pending']],
        },
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('sick', 'maternity', 'holiday', 'personal'),
        allowNull: false,
        validate: {
            isIn: [['sick', 'maternity', 'holiday', 'personal']],
        },
    },
    note: {
        type: sequelize_1.DataTypes.TEXT,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'LeaveRequest',
    timestamps: true,
    underscored: true,
});
exports.default = LeaveRequest;
