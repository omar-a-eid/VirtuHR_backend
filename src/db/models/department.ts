import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Department extends Model {
  declare id: number;
  declare name: string;
  declare managerId: number | null;
  declare divisionId: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'managerId',
      as: 'manager',
      onDelete: 'SET NULL',
    });
    this.belongsTo(models.Division, {
      foreignKey: 'divisionId', // corrected foreign key
      as: 'division',
      onDelete: 'SET NULL',
    });
    this.hasMany(models.Employee, {
      foreignKey: 'departmentId',
      as: 'employees',
    });
    this.hasMany(models.JobPosting, {
      foreignKey: 'departmentId',
      as: 'jobPostings',
    });
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
