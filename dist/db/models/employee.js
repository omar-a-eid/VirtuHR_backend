"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Employee extends sequelize_1.Model {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    static associate(models) {
        this.belongsTo(models.Department, {
            foreignKey: 'departmentId',
            as: 'departmentEmployees',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.Employee, {
            foreignKey: 'managerId',
            as: 'manager',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.DaysOff, {
            foreignKey: 'daysOffId',
            as: 'daysOff',
            onDelete: 'SET NULL',
        });
        this.belongsToMany(models.Announcement, {
            through: 'announcements_send_to',
        });
        this.belongsToMany(models.Cycle, { through: 'employees_cycles' });
        this.belongsToMany(models.Goal, { through: 'employees_goals' });
        this.belongsTo(models.DaysOff, {
            foreignKey: 'companyId',
            as: 'company',
            onDelete: 'SET NULL',
        });
        this.hasOne(models.Department, {
            foreignKey: 'managerId',
            as: 'managedDepartment',
            onDelete: 'SET NULL',
        });
        this.hasOne(models.Termination, {
            foreignKey: 'employeeId',
            onDelete: 'CASCADE',
        });
        this.hasMany(models.Employee, {
            foreignKey: 'managerId',
            as: 'subordinate',
            onDelete: 'SET NULL',
        });
        this.hasMany(models.Announcement);
        this.hasMany(models.Assessment);
        this.hasMany(models.Attendance);
        this.hasMany(models.Feedback);
        this.hasMany(models.Goal);
        this.hasMany(models.Comment);
        this.hasMany(models.FeedbackAnswer);
        this.hasMany(models.JobPosting, {
            foreignKey: 'hiringLeadId',
            onDelete: 'SET NULL',
        });
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
        validate: {
            notEmpty: {
                msg: 'First name is required',
            },
            len: {
                args: [4, 30],
                msg: 'First name must be between 4 and 30 characters',
            },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Last name is required',
            },
            len: {
                args: [4, 30],
                msg: 'Last name must be between 4 and 30 characters',
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            },
        },
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50),
        validate: {
            is: {
                args: /^[\d\-+\s]+$/,
                msg: 'Phone number must be valid',
            },
        },
        allowNull: true,
    },
    position: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    departmentId: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'departments',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    salary: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            min: {
                args: [0],
                msg: 'Salary must be greater than or equal to zero',
            },
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE,
    gender: {
        type: sequelize_1.DataTypes.ENUM('M', 'F'),
        allowNull: true,
        validate: {
            isIn: {
                args: [['M', 'F']],
                msg: 'Gender must be either M or F',
            },
        },
    },
    hireDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: Date.now(),
    },
    managerId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    daysOffId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'days_off',
            key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
    },
    employmentType: {
        type: sequelize_1.DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
        allowNull: false,
        defaultValue: 'full time',
        validate: {
            isIn: {
                args: [['full time', 'part time', 'freelance', 'internship']],
                msg: 'Employment type must be one of full time, part time, freelance, or internship',
            },
        },
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'companies',
            key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'employee'),
        allowNull: false,
        defaultValue: 'employee',
        validate: {
            isIn: {
                args: [['admin', 'employee']],
                msg: 'Employment type must be one of admin or employee',
            },
        },
    },
    dateOfBirth: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Employee',
    timestamps: true,
    paranoid: true,
    underscored: true,
});
exports.default = Employee;
