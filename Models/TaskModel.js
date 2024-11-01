const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Adjust path to your database connection file

const TaskModel = sequelize.define('Task', {
    task_name: {
        type: DataTypes.STRING,
        allowNull: false, // Required
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true, // Optional
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false, // Required
    },
    assigned_to: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false, // Required
    }
}, {
    tableName: 'tasks',
    timestamps: false // Disable timestamps if not needed
});

module.exports = TaskModel;
