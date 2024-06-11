"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('interviews', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            applicant_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'applicants',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            interview_type: {
                type: sequelize_1.DataTypes.ENUM('on-site', 'online'),
                allowNull: false,
                validate: {
                    isIn: [['on-site', 'online']],
                },
            },
            scheduled_at: {
                type: sequelize_1.DataTypes.DATE,
            },
            interview_status: {
                type: sequelize_1.DataTypes.ENUM('scheduled', 'pending', 'in progress', 'completed', 'cancelled', 'rescheduled', 'no show'),
                allowNull: false,
                validate: {
                    isIn: [
                        [
                            'scheduled',
                            'pending',
                            'in progress',
                            'completed',
                            'cancelled',
                            'rescheduled',
                            'no show',
                        ],
                    ],
                },
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
            location_or_link: {
                type: sequelize_1.DataTypes.STRING,
            },
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('interviews');
    },
};
