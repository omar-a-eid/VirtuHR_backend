import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class DaysOff extends Model {
  declare id: number;
  declare sick: number;
  declare maternity: number;
  declare holiday: number;
  declare personal: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.hasOne(models.Employee, {
      foreignKey: 'daysOffId',
      as: 'daysOff',
      onDelete: 'SET NULL',
    });
  }
}

DaysOff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sick: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    maternity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    holiday: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    personal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'DaysOff',
    tableName: 'days_off',
    timestamps: true,
    underscored: true,
  },
);

export default DaysOff;
