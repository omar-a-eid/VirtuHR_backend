"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('assessment_answers', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            assessment_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'assessments',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            answer_text: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('assessment_answers');
    },
};
