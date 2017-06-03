/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';
import fs from 'fs';
import { join } from 'path';

let Station = sqldb.Station;
let Sensor = sqldb.Sensor;
let SensorStream = sqldb.SensorStream;

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    return destroyAll()
      .then(importStations)
      .then(importSensors);
  }
}

function destroyAll() {
  return destroySensorStream()
    .then(destroySensors)
    .then(destroyStations);
}

function destroySensorStream() {
  return SensorStream.destroy({ where: {}});
}

function destroySensors() {
  return Sensor.destroy({ where: {}});
}

function destroyStations() {
  return Station.destroy({ where: {}});
}

function importSensors() {
  // Load up dummy sensor data
  return Sensor
    .destroy({ where: {}})
    .then(() => {
      let sensorList = [];
      let sensorStreamList = [];
      const sensorMockPaths = [
        './server/api/sensor/batteryLevel.json',
        './server/api/sensor/salinity.json',
        './server/api/sensor/windspeed.json'
      ];
      let sensorId = 0; // for DB uniqueness
      for(let i = 0; i < sensorMockPaths.length; i++) {
        const fullPath = join(process.cwd(), sensorMockPaths[i]);
        const curSensorText = fs.readFileSync(fullPath, { encoding: 'utf8' });
        const curSensorList = JSON.parse(curSensorText);
        for(let stnid in curSensorList) {
          sensorList.push({
            id: ++sensorId,
            stnid: stnid,
            type: i,
            lat: curSensorList[stnid].lat,
            lon: curSensorList[stnid].lon
          });
          if(undefined !== curSensorList[stnid].data && undefined !== curSensorList[stnid].data.wsd) {
            for(let curStream of curSensorList[stnid].data.wsd) {
              sensorStreamList.push({
                sensorid: sensorId,
                date: curStream[0],
                value: curStream[1]
              });
            }
          }
        }
      }
      let sensors = Sensor.bulkCreate(sensorList).then(() => {
        console.log('finished loading sensors');
        //load sensor streams
        return SensorStream
          .destroy({ where: {}})
          .then(() => {
            let sensorStreamDb = SensorStream.bulkCreate(sensorStreamList);
            return sensorStreamDb;
          });
      });
      return sensors;
    });
};

function importStations() {
  // Load up dummy station list data
  return Station
    .destroy({ where: {} })
    .then(() => {
      const stationFileName = join(process.cwd(), './server/api/station/stationList.json');
      const stationListText = fs.readFileSync(stationFileName, { encoding: 'utf8' });
      const stationList = JSON.parse(stationListText).stnids;
      let stations = Station.bulkCreate(stationList);
      return stations;
    })
    .then(() => {
      console.log('finished populating stations');
    })
    .catch(err => console.log('error populating stations', err));
}

