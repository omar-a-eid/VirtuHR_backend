import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/database';

const basename = _basename(__filename);
const db: any = {};

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(async (file) => {
    const model = await import(join(__dirname, file));
    const initializedModel = model.default(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
