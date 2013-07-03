#!/usr/bin/env node

/**
 * Ninja Blocks WiFi Utility
 * http://ninjablocks.com/
 *
 * Copyright (c) 2012 Ninja Blocks Inc
 * Licensed under the MIT license.
 *
 * Emily Rose <emily@ninjablocks.com>
 */ 

 
var
	argv = require('optimist').argv
	, express = require('express')
	, config = require('./app/config')
	, logger = require('./lib/logger')
	, creds = require('./lib/credentials')
	, fork = require('child_process').fork
	, port = argv.port || 80
	, path = require('path')
	, util = require('util')
	, app = express()
;


function exit(reason) {

	app.log.error(

		"Exiting: Could not listen on port %s. (%s)"
		, port
		, reason
	);
};

/**
 * Messages from the monitor process
 */
function message(msg) {

	if(!msg.action || typeof msg.data == 'undefined' || msg.error) {

		var 
			stack = new Error().stack
			, error
		;

		if(msg.error && msg.error == "unknownAction" && msg.action) {

			error = util.format(
				'Unknown monitor action: %s'
				, msg.action
			);	
		}
		else {

			error = util.format(
				'Error from monitor: %s'
				, msg.error || "UNKNOWN"
			);
		}

		console.log(stack);
		return;
	}

	app.emit(msg.action, msg.data);
};

var monitor = function monitor() {

	monitor.process = fork(path.resolve(__dirname, 'monitor'));
	
	monitor.process
		.on('message', message)
		.on('exit', monitor)
		.send({ action : "init" })
	;
	// kill child if parent dies
	process.once('exit', function() {
		monitor.process.kill()
	})
};

/**
 * Messages _to_ the monitor process
 */
app.send = function send(action, data) {
	if (!monitor.process) {
		// enqueue message
		app.once('monitor', function() {
			deliver()
		})
	} else deliver()

	function deliver() {
		monitor.process.send({ 
			'action' : action
			, 'data' : data || null 
		});
	}
};

/**
 * Exit if we have problems. Upstart should handle restarts.
 */
process.on("uncaughtException", function(err) {

	if(err.code == "EACCES") {

		exit("Access denied.");

	}
	else if(err.code == "EADDRINUSE") {

		exit("Address in use.");
	}
	else {

		process.stderr.write(err.stack);
		process.stderr.write("\n\n");
	}
	process.exit(1);
});

this.log = new logger({

	env : 'production'
	, logFile : '/var/log/wifisetup.log'
});

app.log = this.log;

creds.call(this, {

	serialFile : '/etc/opt/ninja/serial.conf'
});

config.call(this, app).listen(port);

app.once('platformOK', function() {
  app.log.log('platform ok, starting monitoring')
  monitor();
})

config.call(this, app).listen(port);
