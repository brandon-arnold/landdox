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

function getWindSpeeds(min, max) {
  return SensorStream
    .findAll({
      where: {
        value: {
          gt: min,
          lt: max
        }
      }
    });
}

export function byStnid(req, res) {
  return Station
    .find({
      where: {
        id: req.params.id
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
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
