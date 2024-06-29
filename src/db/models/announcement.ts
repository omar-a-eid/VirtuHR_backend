import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Announcement extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public employeeId!: number;
  public sendToAll!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  static associate(models: any) {
    this.belongsToMany(models.Employee, { through: 'announcements_send_to' });
    this.belongsTo(models.Employee, {
      foreignKey: 'employeeId', // Changed to match the attribute name
      as: 'author',
    });
  }
}

Announcement.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    sendToAll: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Announcement',
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default Announcement;
