import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Goal extends Model {
  declare id: number;
  declare title: string;
  declare assignedTo: number | null;
  declare dueDate: Date;
  declare note: string;
  declare progress: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'assigned_to',
      onDelete: 'SET NULL',
    });
    this.belongsToMany(models.Employee, { through: 'employees_goals' });

    this.hasMany(models.Comment);
    this.hasMany(models.Milestone);
  }
}

Goal.init(
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
    assignedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    note: {
      type: DataTypes.TEXT,
    },
    progress: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    sequelize,
    modelName: 'Goal',
    timestamps: true,
    underscored: true,
  },
);

export default Goal;
