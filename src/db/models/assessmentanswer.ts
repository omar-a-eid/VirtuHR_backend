import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class AssessmentAnswer extends Model {
  declare id: number;
  declare assessmentId: number;
  declare answerText: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;
  // the employeeId will be handled depending on the assessment type  (slef/manager)
  static associate(models: any) {
    this.belongsTo(models.Assessment, {
      foreignKey: 'assessment_id',
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
    answerText: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'AssessmentAnswer',
    timestamps: true,
    underscored: true,
  },
);

export default AssessmentAnswer;
