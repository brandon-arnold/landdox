/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

//Station models
db.Station = db.sequelize.import('../api/station/station.model');
db.Sensor = db.sequelize.import('../api/sensor/sensor.model');
db.SensorStream = db.sequelize.import('../api/sensor/sensorStream.model');
db.Station.hasMany(db.Sensor, {
  foreignKey: {
    name: 'stnid',
    allowNull: true
  }
});
db.Sensor.belongsTo(db.Station, {
  foreignKey: 'stnid',
  targetKey: 'id'
});
db.Sensor.hasMany(db.SensorStream, {
  foreignKey: {
    name: 'sensorid',
    allowNull: true
  }
});
db.SensorStream.belongsTo(db.Sensor, {
  foreignKey: 'sensorid',
  targetKey: 'id'
});

module.exports = db;
