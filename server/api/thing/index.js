'use strict';

var express = require('express');
var controller = require('./requests.controller');

var config = require('../../config/environment');

var app = express.Router();

var debug = require('debug')('http');
var url = require('url');
var _ = require('lodash');
var io = require('socket.io')();

var low = require('lowdb');
var db = low(config.appconfig.jsonFileURL);



var router = express.Router();


app.get('/*', function(request, res){

  debug('/----------------------/api/-------------------/');

  var rRoute = request.params[0];

  debug('requestRoute: ', rRoute);
    
  var parseResult = db(routesName).find({ route: ('/' + rRoute)});
  
  debug('parseResult ', parseResult);

  if(parseResult){
    debug('200 - route ' + rRoute + ' found in the library');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(parseResult.content);
  } else {
    debug('404 - route ' + rRoute + ' not found');
    res.writeHead(404, {'Content-Type': 'text/html'});   
  }

   res.end();
  
});



module.exports = app;