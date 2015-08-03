'use strict';

var express = require('express'),
	controller = require('./room.controller'),
	router = express.Router();

router.post('/', controller.join);

module.exports = router;