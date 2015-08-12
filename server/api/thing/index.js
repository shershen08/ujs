/**
 * @fileOverview 
 */

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

/**

*/
app.get('/*', function(request, res){

  debug('/----------------------/api/-------------------/');

  var rRoute = request.params[0];

  debug('1 requestRoute: ', rRoute);

  debug('2 requestRoute: ', db(config.appconfig.routesName).value());
    
  var parseResult = db(config.appconfig.routesName).find({ route: ('/' + rRoute)});
  
  debug('parseResult ', parseResult);

  if(parseResult){
    debug('200 - route ' + rRoute + ' found in the library');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(parseResult.content);
    res.end();
  } else {
    debug('404 - route ' + rRoute + ' not found');
    //res.writeHead(404, {'Content-Type': 'text/html'});   

    res.render('appnotification', { pageTitle : '404',
                                    notificationTitle: '404',
                                    notificationDetails : 'Route not found',
                                    notificationRoute : rRoute});

  }

   
  
});



module.exports = app;