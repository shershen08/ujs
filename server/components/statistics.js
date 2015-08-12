/**
Statistics module 
*/

var url = require('url');
var _ = require('lodash');
var debug = require('debug')('http');


// middleware enabled or not
var enabled = true;

/**

*/
var stats = function(onoff) {

	enabled = (onoff == 'on') ? true : false;
    
    return function(req, res, next) {
       
       var currentPath = req.path;

       if(enabled
       && currentPath.indexOf('ujs-setup') == -1 
       && currentPath.indexOf('api') > -1 ){

       	 debug('STATS module: ', currentPath, ' +1 ');	

       }

       next();
    }
    
};


module.exports = stats;