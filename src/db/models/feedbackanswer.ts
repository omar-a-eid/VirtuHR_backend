import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class FeedbackAnswer extends Model {
  declare id: number;
  declare feedbackId: number;
  declare employeeId: number;
  declare reviewerId: number;
  declare answer: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Feedback, {
      foreignKey: 'feedback_id',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      as: 'feedbackReceiver',
      foreignKey: 'employee_id',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      as: 'feedbackReviewer',
      foreignKey: 'reviewer_id',
      onDelete: 'CASCADE',
    });
  }
}

FeedbackAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    feedbackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'feedbacks',
        key: 'id',
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    answer: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'FeedbackAnswer',
    timestamps: true,
    underscored: true,
  },
);

export default FeedbackAnswer;
