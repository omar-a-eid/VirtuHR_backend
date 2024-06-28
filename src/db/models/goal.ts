import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Goal extends Model {
  declare id: number;
  declare title: string;
  declare assignedTo: number | null;
  declare dueDate: Date;
  declare note: string;
  declare isCompleted: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'assignedTo',
      onDelete: 'SET NULL',
    });
    // this.belongsToMany(models.Employee, { through: 'employees_goals' });

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
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
