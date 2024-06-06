import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Comment extends Model {
  declare id: number;
  declare goalId: number;
  declare employeeId: number;
  declare commentText: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Goal, {
      foreignKey: 'goal_id',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      onDelete: 'SET NULL',
    });
  }
}

Comment.init(
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
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    underscored: true,
  },
);

export default Comment;
