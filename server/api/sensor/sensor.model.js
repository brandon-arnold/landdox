'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Sensor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT
  });
}
