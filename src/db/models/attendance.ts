import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class Attendance extends Model {
  declare id: number;
  declare employeeId: number;
  declare hours: number;
  declare checkedOut: boolean;
  declare createdAt: Date; //check_in_time
  declare updatedAt: Date; //check_out_time

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      onDelete: 'CASCADE',
    });
  }
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    hours: {
      type: DataTypes.INTEGER,
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Attendance',
    timestamps: true,
    underscored: true,
  },
);

export default Attendance;
