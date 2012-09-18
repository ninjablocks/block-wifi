var 
	middleware = require('./middleware')
	, express = require('express')
	, route = require('./routes')
	, events = require('events')
	, util = require('util')
;

module.exports = function(app) {
	
	var mids = middleware(app);	
	
	events.EventEmitter.call(app);
	util.inherits(events.EventEmitter, app);

	app.use(express.bodyParser());
	app.use(express.methodOverride());
		
	app.all('*', function(req, res, next) {

		console.log(req.route);
		next();
	});

	return route(app, mids);	
};