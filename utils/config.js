const morgan = require('morgan');
const express = require('express');
const cors = require("cors")
const { Sequelize } = require('sequelize');


const {
  STATUS_CODE_SERVER_ERROR 

} = require('../utils/constant');
class AppConfig {
  constructor(app) {
    this.app = app;
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      port:process.env.DB_PORT

    });
  }

  async configuration() {
    this.app.use(cors())
    this.app.use(morgan(process.env.DEV));
    this.app.use(express.json());
    

  }

  async Dbconnect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async synchronizeAllModelsWithDatabase(models) {
    try {
      for (const model of models) {
        await model.sync();
        console.log(`${model.name} table has been synchronized.`);
      }
    } catch (error) {
      console.error('Error synchronizing models with the database:', error);
      throw error;
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
 
  async startServer() {
    const PORT = process.env.PORT || process.env.SERVER_PORT;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

module.exports = AppConfig;
