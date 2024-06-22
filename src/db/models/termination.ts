import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Termination extends Model {
  declare id: number;
  declare reason: string;
  declare employeeId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
    });
  }
}

Termination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Termination',
    timestamps: true,
    underscored: true,
  },
);

export default Termination;
