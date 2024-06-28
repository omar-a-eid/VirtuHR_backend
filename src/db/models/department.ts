import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Department extends Model {
  [x: string]: any;
  declare id: number;
  declare name: string;
  declare managerId: number | null;
  declare divisionId: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'managerId',
      as: 'managedDepartment',
      onDelete: 'SET NULL',
    });
    this.belongsTo(models.Division, {
      foreignKey: 'divisionId',
      onDelete: 'SET NULL',
    });
    this.hasMany(models.Employee, {
      foreignKey: 'departmentId',
      as: 'departmentEmployees',
      onDelete: 'SET NULL',
    });
    this.hasMany(models.JobPosting);
  }
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    divisionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'divisions',
        key: 'id',
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Department',
    timestamps: true,
    underscored: true,
  },
);

export default Department;
