"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Employee extends sequelize_1.Model {
    // Custom method to get full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    // Association methods will be added here
    // Will create the foreign key automcatically.
    // Use the allias to access the data
    static associate(models) {
        this.belongsTo(models.Department, {
            foreignKey: 'department_id',
            as: 'department',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.Employee, {
            foreignKey: 'manager_id',
            as: 'manager',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.DaysOff, {
            foreignKey: 'days_off_id',
            as: 'daysOff',
            onDelete: 'SET NULL',
        });
        this.belongsToMany(models.Announcement, {
            through: 'announcements_send_to',
        });
        this.belongsToMany(models.Cycle, { through: 'employees_cycles' });
        this.belongsToMany(models.Goal, { through: 'employees_goals' });
        this.hasOne(models.Department);
        this.hasOne(models.Termination);
        this.hasMany(models.Employee);
        this.hasMany(models.Announcement);
        this.hasMany(models.Assessment);
        this.hasMany(models.Attendance);
        this.hasMany(models.Feedback);
        this.hasMany(models.Goal);
        this.hasMany(models.Comment);
        this.hasMany(models.FeedbackAnswer);
        this.hasMany(models.FeedbackAnswer);
        this.hasMany(models.JobPosting);
        this.hasMany(models.LeaveRequest);
    }
}
Employee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    passowrd: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    position: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    departmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'departments',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    salary: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE,
    gender: {
        type: sequelize_1.DataTypes.ENUM('M', 'F'),
        allowNull: false,
        validate: {
            isIn: [['M', 'F']],
        },
    },
    hireDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    managerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    daysOffId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'days_off',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    employmentType: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'full time',
        validate: {
            isIn: [['full time', 'part time', 'freelance', 'internship']],
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Employee',
    timestamps: true,
    paranoid: true, // Enables soft deletes
    underscored: true,
});
exports.default = Employee;
