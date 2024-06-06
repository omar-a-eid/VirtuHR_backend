import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Cycle extends Model {
  declare id: number;
  declare name: string;
  declare startDate: Date;
  declare cycleType: 'interval' | 'start_date';
  declare period: string;
  declare includeAll: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsToMany(models.Employee, { through: 'employees_cycles' });
    this.hasOne(models.Feedback);
    this.hasOne(models.Assessment);
  }
}

Cycle.init(
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
    startDate: {
      type: DataTypes.DATE,
    },
    period: {
      type: DataTypes.STRING,
    },
    cycle_type: {
      type: DataTypes.ENUM('interval', 'start_date'),
      validate: {
        isIn: [['interval', 'start_date']],
      },
    },
    includeAll: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Cycle',
    timestamps: true,
    underscored: true,
  },
);

export default Cycle;
