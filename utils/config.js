const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

class AppConfig {
  constructor(app, url) {
    this.app = app;
    this.mongoURI = url;
  }

  async configuration() {
    this.app.use(morgan(process.env.DEV));
    this.app.use(express.json());
  }

  async Dbconnect() {
    try {
      await mongoose.connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async startServer() {
    const PORT = process.env.PORT || process.env.SERVER_PORT;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

module.exports = AppConfig;
