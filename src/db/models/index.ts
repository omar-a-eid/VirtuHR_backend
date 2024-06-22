import { readdir } from 'fs/promises';
import { basename as _basename, join } from 'path';
import { Model, Sequelize } from 'sequelize';
import sequelize from '../../config/database';

const basename = _basename(__filename);
const db: { [key: string]: any } = {};

async function initializeModels() {
  try {
    const files = await readdir(__dirname);
    for (const file of files) {
      if (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1
      ) {
        const modelImport = await import(join(__dirname, file));
        const model = modelImport.default;
        if (typeof model === 'function' && model.prototype instanceof Model) {
          db[model.name] = model;
        }
      }
    }

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    console.log('Models initialized and associations set up.');
  } catch (error) {
    console.error('Error initializing models:', error);
  }
}

initializeModels();

export default db;
