import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
class Announcement extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare employId: number;
  declare sendToAll: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
  // for status we will use soft delete

  static associate(models: any) {
    this.belongsToMany(models.Employee, { through: 'announcements_send_to' });
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
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
    employId: {
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
