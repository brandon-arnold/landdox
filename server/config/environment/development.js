'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:Pa55word@192.168.99.100:5432/postgres',
    options: {
      // logging: false,
      dialect: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'postgres',
      password: 'Pa55word',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
