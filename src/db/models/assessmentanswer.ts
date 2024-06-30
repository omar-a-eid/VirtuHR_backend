import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class AssessmentAnswer extends Model {
  declare id: number;
  declare assessmentId: number;
  declare answers: JSON;
  declare employeeId: number;
  declare recipientId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Assessment, {
      foreignKey: 'assessmentId',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      as: 'employee',
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      as: 'recipient',
      foreignKey: 'recipientId',
      onDelete: 'CASCADE',
    });
  }
}

AssessmentAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'assessments',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    recipientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AssessmentAnswer',
    timestamps: true,
    underscored: true,
  },
);

export default AssessmentAnswer;
