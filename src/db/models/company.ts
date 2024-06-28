import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class Company extends Model {
  declare id: number;
  declare domainName: string;
  declare companyName: string;
  declare companySize:
    | '1-24'
    | '25-75'
    | '76-150'
    | '151-300'
    | '301-500'
    | '501+';
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.hasMany(models.Employee, {
      foreignKey: 'companyId',
      as: 'company',
      onDelete: 'SET NULL',
    });
  }
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    domainName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companySize: {
      type: DataTypes.ENUM(
        '1-24',
        '25-75',
        '76-150',
        '151-300',
        '301-500',
        '501+',
      ),
      validate: {
        isIn: {
          args: [['1-24', '25-75', '76-150', '151-300', '301-500', '501+']],
          msg: 'Employee count should be in the specified range',
        },
      },
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Company',
    timestamps: true,
    underscored: true,
  },
);

export default Company;
