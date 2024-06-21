import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class JobPosting extends Model {
  declare id: number;
  declare title: string;
  declare jobStatus: 'archived' | 'active';
  declare hiringLead: string;
  declare department: string;
  declare employmentType:
    | 'full time'
    | 'part time'
    | 'freelance'
    | 'internship';
  declare minimumExperience: string;
  declare compensation: number;
  declare description: string;
  declare location: string;

  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'hiring_lead_id',
      onDelete: 'SET NULL',
    });
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      onDelete: 'SET NULL',
    });
    this.hasMany(models.Applicant);
  }
}

JobPosting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobStatus: {
      type: DataTypes.ENUM('archived', 'active'),
    },
    hiringLeadId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    employmentType: {
      type: DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
    },
    minimumExperience: {
      type: DataTypes.STRING,
    },
    compensation: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'JobPosting',
    timestamps: true,
    underscored: true,
  },
);

export default JobPosting;
