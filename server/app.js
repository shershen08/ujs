/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var debug = require('debug')('http');

var dr = require('dynamic-routes');
var url = require('url');
var _ = require('lodash');

//JSON db configuration

var low = require('lowdb');
var jsonFileURL = 'db/db.json';
var db = low(jsonFileURL);


var express = require('express');
var config = require('./config/environment');
var stats = require('./components/statistics.js');

// Setup server
var app = express();

//save stats
app.use(stats());

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
