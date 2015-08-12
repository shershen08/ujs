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


var dataTypes = [
      {id: 1, title: 'json'},        
      {id: 2, title: 'html'},        
      {id: 3, title: 'text'},        
      {id: 4, title: 'static'}
          ];

/**

*/
app.get('/', function(request, res){

 var query = getQuery(request);

 if(!query.controller) {
  res.render('adminindex', { pageTitle : 'UIJS cofigration page' }); 
 }

if(query.controller == 'showlist') {
  var currentRoutes = db(config.appconfig.routesName).value();
  res.render('showlist', { pageTitle : 'Mocked routes list', listOfRoutes: currentRoutes}); 
 }

if(query.controller == 'addrequest') {
  res.render('addrequest', { pageTitle : 'Add request mock', dataTypes: dataTypes}); 
 }
 
});

/**

*/
app.post('/api/addrequest', function(request, res){

  var query = getQuery(request);
  
  debug('/----------------------/addrequest/-------------------/');
  debug('Query: ', query);


  res.writeHead(200, {'Content-Type': 'text/html'});

  var formData = request.body;



  if(formData['route-url'] && formData['reply-content']) {

    var newTime = (new Date()).getTime();
    db(config.appconfig.routesName).push({ route: formData['route-url'],
                                          added: newTime,
                                          content: formData['reply-content'],
                                          title: formData['route-title'],
                                          datatype: formData['route-datatype'],
                                          views: 0});

    res.write('Route added\n');
    
  } else {
    res.write('Route path or content are not provided!\n');
  }

  res.end();

});


app.get('/api/clearstats', function(request, res){

  debug('/----------------------/clearstats/-------------------/');
    
  db(config.appconfig.routesName).map(function(item){
    item.views = 0;
  });

  res.render('appnotification', { pageTitle : 'All routes stats is cleared', notificationTitle: 'All routes stats is cleared'}); 
  
});


/**

*/
app.get('/api/clearlist', function(request, res){

  debug('/----------------------/clearlist/-------------------/');
    
  db(config.appconfig.routesName).remove();

  res.render('appnotification', { pageTitle : 'Routes cleared', notificationTitle: 'Routes cleared' }); 
  
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