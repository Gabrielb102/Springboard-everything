const { Sequelize } = require('sequelize');
const { DB_URI } = require('../config');
const db = new Sequelize(DB_URI); 

async function verifyDBOperational() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = db;