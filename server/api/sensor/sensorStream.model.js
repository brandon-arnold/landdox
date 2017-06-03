'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('SensorStream', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sensorid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    value: DataTypes.INTEGER
  });
}
