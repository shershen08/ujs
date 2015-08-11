/**
 * @fileOverview 
 */

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


/**

@name
@param
*/
function getQuery(r){
  var url_parts = url.parse(r.url, true);
  var query = url_parts.query;
  return query;
}


/**

*/
var routeObject = {
	  route    : '',
    added    : 0,
    content  : '',
    views    : 0,
    datatype : 'application/json'
};


/**

*/
app.get('/', function(request, res){
 res.render('adminindex', { pageTitle : 'UIJS cofigration page' });
});

/**

*/
app.get('/api/addrequest', function(request, res){

  var query = getQuery(request);
  
  debug('/----------------------/addrequest/-------------------/');
  debug('Query: ', query);


  res.writeHead(200, {'Content-Type': 'text/html'});


  if(query.route && query.content) {

    var newTime = (new Date()).getTime();
    db(config.appconfig.routesName).push({ route: query.route,
                          added: newTime,
                          content: query.content,
                          views: 0});

    res.write('Route added\n');
    res.write('route: ' + query.route + '\n');
    res.write('content: ' + query.content);
    
  } else {
    res.write('Route path or content are not provided!\n');
  }

  res.end();

});


app.get('/api/learstats', function(request, res){

  debug('/----------------------/clearstats/-------------------/');
    
  db(config.appconfig.routesName).map(function(item){
    item.views = 0;
  });

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('All routes stats is cleared ');
  res.end();
  
});


/**

*/
app.get('/api/clearlist', function(request, res){

  debug('/----------------------/clearlist/-------------------/');
    
  db(config.appconfig.routesName).remove();

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Routes cleared ');
  res.end();
  
});


/**

*/
app.get('/api/showlist', function(request, res){

  var query = getQuery(request);

  debug('/----------------------/showlist/-------------------/');
    
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