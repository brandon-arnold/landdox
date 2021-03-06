'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Station', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
}
