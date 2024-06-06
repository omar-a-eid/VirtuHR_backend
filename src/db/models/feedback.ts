import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Feedback extends Model {
  declare id: number;
  declare cycleId: number;
  declare feedbackType: 'upward' | 'peer';
  declare questions: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Cycle, {
      foreignKey: 'cycle_id',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.FeedbackAnswer);
  }
}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cycles',
        key: 'id',
      },
    },
    feedbackType: {
      type: DataTypes.ENUM('upward', 'peer'),
      allowNull: false,
      validate: {
        isIn: [['upward', 'peer']],
      },
    },
    questions: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Feedback',
    timestamps: true,
    underscored: true,
  },
);

export default Feedback;
