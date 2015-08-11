'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/jsonconfserver-dev'
  },

  appconfig : {
  	jsonFileURL     : 'db/db.json',
  	routesName		: 'routes'
  },

  seedDB: true
};
