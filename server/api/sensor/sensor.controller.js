'use strict';

import jsonpatch from 'fast-json-patch';
import {Station, Sensor, SensorStream} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function getStationWithData(stnid) {
  return Station
    .find({
      where: {
        id: stnid
      },
      include: [
        {
          model: Sensor,
          include: [
            {
              model: SensorStream
            }
          ]
        }
      ]
    });
}

export function index(req, res) {
  const {stnid}  = req.query;
  if(undefined !== stnid) {
    return getStationWithData(stnid)
      .then(station => station.Sensors)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  console.log(stnid);
}
