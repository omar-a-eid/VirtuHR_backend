import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class Assessment extends Model {
  declare id: number;
  declare cycleId: number;
  declare questions: JSON;
  declare questionType: 'self' | 'manager';
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Cycle, {
      foreignKey: 'cycle_id',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.AssessmentAnswer);
  }
}

Assessment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cycles',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    questionType: {
      type: DataTypes.ENUM('self', 'manager'),
      allowNull: false,
      validate: {
        isIn: [['self', 'manager']],
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Assessment',
    timestamps: true,
    underscored: true,
  },
);

export default Assessment;
