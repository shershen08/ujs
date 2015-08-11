'use strict';

var express = require('express');
var config = require('../../config/environment');
var controller = require('./setup.controller');



var debug = require('debug')('http');

var app = express.Router();

var url = require('url');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var low = require('lowdb');

var db = low(config.appconfig.jsonFileURL);

global.appRoot = path.resolve(__dirname, '../../../');

function getQuery(r){
  var url_parts = url.parse(r.url, true);
  var query = url_parts.query;
  return query;
}

var routeObject = {
	  route: '',
    added: 0,
    content: '',
    views: 0,
    datatype : 'application/json'
};

/**


*/
app.get('/addrequest', function(request, res){

  var query = getQuery(request);
  
  debug('/----------------------/addrequest/-------------------/');
  debug('query: ', query);

  var newTime = (new Date()).getTime();
  db(config.appconfig.routesName).push({ route: query.route,
                        added: newTime,
                        content: query.content,
                        views: 0});

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Route added\n');
  res.write('route: ' + query.route + '\n');
  res.write('content: ' + query.content);
  res.end();

});


//todo add 'views' -> 0
//
app.get('/clearstats', function(request, res){
/*
  debug('/----------------------/clearstats/-------------------/');
    
  db(routesName).remove();

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Routes cleared ');
  res.end();
  */
});

app.get('/clearlist', function(request, res){

  debug('/----------------------/clearlist/-------------------/');
    
  db(config.appconfig.routesName).remove();

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Routes cleared ');
  res.end();
  
});

app.get('/showlist', function(request, res){

  var query = getQuery(request);

  debug('/----------------------/showlist/-------------------/');
  debug('config: ', config.appconfig);
    
  var filePath = path.join(global.appRoot, config.appconfig.jsonFileURL);
    
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){

     if (!err){

      if(query.html){
         res.writeHead(200, {'Content-Type': 'text/html'});
      }
      if(query.json){
         res.writeHead(200, {'Content-Type': 'application/json'});
      }

      res.write(data);
      res.end();

     }else{
      console.log(err);
     }
  });   
  
});


module.exports = app;