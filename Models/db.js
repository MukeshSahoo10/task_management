const { Sequelize } = require('sequelize');

// Load environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'task';
const DB_PORT = process.env.DB_PORT || 3306;

// Create a Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000    // 60 seconds connection timeout
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,           // 30 seconds to acquire a connection
        idle: 10000               // 10 seconds before releasing idle connection
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('MySQL is Connected...');
    })
    .catch((err) => {
        console.error('MySQL Connection Error:', err);
    });

module.exports = sequelize;
