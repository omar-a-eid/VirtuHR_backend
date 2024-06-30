import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class Assessment extends Model {
  declare id: number;
  declare cycleId: number;
  declare repeat: number;
  declare managerQuestions: JSON;
  declare slefQuestions: JSON;
  declare startDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Cycle, {
      foreignKey: 'cycleId',
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
    managerQuestions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    selfQuestions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    repeat: {
      type: DataTypes.NUMBER,
      allowNull: false,
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
