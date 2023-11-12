const express = require('express')
const routeCollector = express.Router() 

// Require the actual route files
const test = require('../../../__tests__/unit/post_admin_test');
const admin = require('./admin');

// Use the routes
routeCollector.use('/test', test);
routeCollector.use('/admin', admin);


module.exports = routeCollector;

// const test = '/test.js'
// const admin = '/admin.js'
// // WILL END UP ADDING THE PASSPORT JS USE ROUTECOLLECTOR HERE

