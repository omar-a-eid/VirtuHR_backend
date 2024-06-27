import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class LeaveRequest extends Model {
  declare id: number;
  declare employeeId: number;
  declare startTime: Date;
  declare endTime: Date;
  declare status: 'rejected' | 'accepted' | 'pending';
  declare comment: string;
  declare category: 'sick' | 'maternity' | 'holiday' | 'personal';
  declare note: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
      onDelete: 'CASCADE',
    });
  }
}

LeaveRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('rejected', 'accepted', 'pending'),
      allowNull: false,
      validate: {
        isIn: [['rejected', 'accepted', 'pending']],
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ENUM('sick', 'maternity', 'holiday', 'personal'),
      allowNull: false,
      validate: {
        isIn: [['sick', 'maternity', 'holiday', 'personal']],
      },
    },
    note: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'LeaveRequest',
    timestamps: true,
    underscored: true,
  },
);

export default LeaveRequest;
