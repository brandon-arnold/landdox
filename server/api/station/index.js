'use strict';

var express = require('express');
var controller = require('./station.controller');

var router = express.Router();

router.get('/:id', controller.byStnid);

module.exports = router;
