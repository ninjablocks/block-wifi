var 
	middleware = require('./middleware')
	, express = require('express')
	, route = require('./routes')
	, events = require('events')
	, crypto = require('crypto')
	, util = require('util')
	, path = require('path')
;

module.exports = function(app) {

	events.EventEmitter.call(app);
	util.inherits(events.EventEmitter, app);

	app.set('view engine', 'ejs');
	app.set('views', path.resolve(__dirname, '..', 'views'));
	app.use(express.static(path.resolve(__dirname, '..', 'public')));
	app.use(express.methodOverride());

	app.use(express.bodyParser());
	app.use(express.favicon());
	app.use(express.cookieParser(crypto.randomBytes(7).toString('base64')));
	app.use(express.cookieSession());	

	app.use(function(req, res, next) {
		var os = require('os')
		if (os.platform() !== 'linux') {
			var err = new Error('Wifi Setup is not implemented on this platform.')
			return next(err)
		}
		app.emit('platformOK', true);
		next()
	})

	
	/**
	 * We can log everything here
	 */	
	app.all('*', function(req, res, next) {
		// console.log(req.route);
		// ^ too verbose, we'll log in each route.
		next();

	});




	route(app, middleware(this, app));
	app.use(function(err, req, res, next) {
		if (!err) return next();
		console.error(err, err.stack)			
		res.status(500);
		res.render('error', {
			title: 'Sorry',
			message: err.message
		})
	})

	return app
};
