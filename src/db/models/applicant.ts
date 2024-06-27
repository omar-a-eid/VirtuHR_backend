import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Applicant extends Model {
  declare id: number;
  declare fullName: string;
  declare email: string;
  declare phone: string;
  declare cvPath: string;
  declare applicantStatus: 'applied' | 'interviewing' | 'hired' | 'rejected';
  declare jobId: number;
  declare coverLetter: string;
  declare university: string;
  declare college: string;
  declare major: string;
  declare graduationDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date | null;

  static associate(models: any) {
    this.belongsTo(models.JobPosting, {
      foreignKey: 'jobId',
      onDelete: 'CASCADE',
    });

    this.hasOne(models.Interview);
  }
}

Applicant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicantStatus: {
      type: DataTypes.ENUM('applied', 'interviewing', 'hired', 'rejected'),
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_postings',
        key: 'id',
      },
    },
    coverLetter: {
      type: DataTypes.TEXT,
    },
    university: {
      type: DataTypes.STRING,
    },
    college: {
      type: DataTypes.STRING,
    },
    major: {
      type: DataTypes.STRING,
    },
    graduationDate: {
      type: DataTypes.DATE,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Applicant',
    timestamps: true,
    underscored: true,
    paranoid: true, // Enables soft delete functionality
  },
);

export default Applicant;
