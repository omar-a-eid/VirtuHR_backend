import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Employee extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare image?: string;
  declare password: string;
  declare phone?: string;
  declare position?: string;
  declare departmentId?: number;
  declare salary?: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
  declare gender?: 'M' | 'F';
  declare hireDate?: Date;
  declare managerId?: number;
  declare location?: string;
  declare daysOffId?: number;
  declare role: 'admin' | 'employee';
  declare companyId: number;
  declare dateOfBirth?: Date;
  declare employmentType:
    | 'full time'
    | 'part time'
    | 'freelance'
    | 'internship';

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static associate(models: any) {
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

    this.belongsTo(models.Company, {
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

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required',
        },
        len: {
          args: [3, 30],
          msg: 'First name must be between 4 and 30 characters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required',
        },
        len: {
          args: [3, 30],
          msg: 'Last name must be between 4 and 30 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      validate: {
        is: {
          args: /^[\d\-+\s]+$/,
          msg: 'Phone number must be valid',
        },
      },
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    departmentId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    salary: {
      allowNull: true,
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Salary must be greater than or equal to zero',
        },
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: true,
      validate: {
        isIn: {
          args: [['M', 'F']],
          msg: 'Gender must be either M or F',
        },
      },
    },
    hireDate: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    managerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'SET NULL',
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    daysOffId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'days_off',
        key: 'id',
      },
      allowNull: true,
      onDelete: 'SET NULL',
    },
    employmentType: {
      type: DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
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
      type: DataTypes.INTEGER,
      references: {
        model: 'companies',
        key: 'id',
      },
      onDelete: 'SET NULL',
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'employee'),
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
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default Employee;
