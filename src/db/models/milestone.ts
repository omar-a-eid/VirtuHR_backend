import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Milestone extends Model {
  declare id: number;
  declare title: string;
  declare goalId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Goal, {
      foreignKey: 'goal_id',
      onDelete: 'CASCADE',
    });
  }
}

Milestone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    goalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'goals',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Milestone',
    timestamps: true,
    underscored: true,
  },
);

export default Milestone;
