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

 ;(function() {
	
	var
		argv = require('optimist').argv
		, config = require('./app/config')
		, fork = require('child_process').fork
		, express = require('express')
		, port = argv.port || 80
		, util = require('util')
		, app = express()
		, monitor
	;

	function exit(reason) {

		process.stderr.write(

			util.format(

				"ERROR: Could not listen on port %s. %s\n"
				, port
				, reason
			)
		);
		process.exit(1);
	};

	/**
	 * Messages from the monitor proccess
	 */
	function message(msg) {

		if(!msg.action || typeof msg.data == 'undefined' || msg.error) {

			return;
		}
		console.log(msg);
		app.emit(msg.action, msg.data);
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
	});

	monitor = fork('./monitor');
	monitor.on('message', message);
	monitor.send({ action : "init" });

	config(app).listen(port);

})();
