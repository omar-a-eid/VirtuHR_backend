"use strict";
// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../../config/database';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Employee extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   declare id: number;
//   declare firstName: string;
//   declare lastName: string;
//   declare email: string;
//   declare phone?: string;
//   declare position: string;
//   declare departmentId: number;
//   declare salary: number;
//   declare createdAt: Date;
//   declare updatedAt: Date;
//   declare deletedAt: Date | null;
//   declare gender: 'M' | 'F';
//   declare hireDate: Date;
//   declare managerId?: number;
//   declare location: string;
//   declare daysOffId: number;
//   declare amountOfRaise: number;
//   declare employmentType:
//     | 'full time'
//     | 'part time'
//     | 'freelance'
//     | 'internship';
//   // Custom method to get full name
//   getFullName(): string {
//     return `${this.firstName} ${this.lastName}`;
//   }
//   // Association methods will be added here
//   // Will create the foreign key automcatically.
//   // Use the allias to access the data
//   static associate(models: any) {
//     this.belongsTo(models.Department, {
//       foreignKey: 'department_id',
//       as: 'department',
//       onDelete: 'SET NULL',
//     });
//     this.belongsTo(models.Employee, {
//       foreignKey: 'manager_id',
//       as: 'manager',
//       onDelete: 'SET NULL',
//     });
//     this.belongsTo(models.DaysOff, {
//       foreignKey: 'days_off_id',
//       as: 'daysOff',
//       onDelete: 'SET NULL',
//     });
//     this.belongsToMany(models.Announcement, {
//       through: 'announcements_send_to',
//     });
//     this.belongsToMany(models.Cycle, { through: 'employees_cycles' });
//     this.belongsToMany(models.Goal, { through: 'employees_goals' });
//     this.hasOne(models.Department);
//     this.hasOne(models.Termination);
//     this.hasMany(models.Employee);
//     this.hasMany(models.Announcement);
//     this.hasMany(models.Assessment);
//     this.hasMany(models.Attendance);
//     this.hasMany(models.Feedback);
//     this.hasMany(models.Goal);
//     this.hasMany(models.Comment);
//     this.hasMany(models.FeedbackAnswer);
//     this.hasMany(models.FeedbackAnswer);
//     this.hasMany(models.JobPosting);
//     this.hasMany(models.LeaveRequest);
//   }
// }
// Employee.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstName: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'First name is required',
//         },
//         len: {
//           args: [4, 30],
//           msg: 'First name must be between 4 and 30 characters',
//         },
//       },
//     },
//     lastName: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Last name is required',
//         },
//         len: {
//           args: [4, 30],
//           msg: 'Last name must be between 4 and 30 characters',
//         },
//       },
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: {
//           msg: 'Must be a valid email address',
//         },
//       },
//     },
//     image: {
//       type: DataTypes.STRING(255),
//     },
//     passowrd: {
//       type: DataTypes.STRING,
//     },
//     phone: {
//       type: DataTypes.STRING(50),
//       validate: {
//         isEmail: {
//           msg: 'Must be a valid email address',
//         },
//       },
//     },
//     position: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     departmentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'departments',
//         key: 'id',
//       },
//       onDelete: 'SET NULL',
//     },
//     salary: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: [0],
//         msg: 'Salary must be greater than or equal to zero',
//       },
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//     deletedAt: DataTypes.DATE,
//     gender: {
//       type: DataTypes.ENUM('M', 'F'),
//       allowNull: false,
//       validate: {
//         isIn: {
//           args: [['M', 'F']],
//           msg: 'Gender must be either M or F',
//         },
//       },
//     },
//     hireDate: {
//       type: DataTypes.DATE,
//     },
//     managerId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'employees',
//         key: 'id',
//       },
//       onDelete: 'SET NULL',
//     },
//     location: {
//       type: DataTypes.STRING(255),
//     },
//     daysOffId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'days_off',
//         key: 'id',
//       },
//       onDelete: 'SET NULL',
//     },
//     employmentType: {
//       type: DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
//       allowNull: false,
//       defaultValue: 'full time',
//       validate: {
//         isIn: {
//           args: [['full time', 'part time', 'freelance', 'internship']],
//           msg: 'Employment type must be one of full time, part time, freelance, or internship',
//         },
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Employee',
//     timestamps: true,
//     paranoid: true, // Enables soft deletes
//     underscored: true,
//   },
// );
// export default Employee;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Employee extends sequelize_1.Model {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
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
    },
    passowrd: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50),
        validate: {
            is: {
                args: /^[\d\-+\s]+$/, // Phone number regex validation
                msg: 'Phone number must be valid',
            },
        },
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
        allowNull: false,
        validate: {
            isIn: {
                args: [['M', 'F']],
                msg: 'Gender must be either M or F',
            },
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
}, {
    sequelize: database_1.default,
    modelName: 'Employee',
    timestamps: true,
    paranoid: true, // disables soft deletes and make it hard delete
    underscored: true,
});
exports.default = Employee;
