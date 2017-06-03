'use strict';

import {EventEmitter} from 'events';
var Station = require('../../sqldb').Station;
var StationEvents = new EventEmitter();

StationEvents.setMaxListeners(0);

var events = {
  afterCreate: 'save'
};

function registerEvents(Station) {
  for (var e in events) {
    let event = events[e];
    Station.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    StationEvents.emit(`${event}:${doc._id}`, doc);
    StationEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Station);
export default StationEvents;
