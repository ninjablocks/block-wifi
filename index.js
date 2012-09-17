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
		, route = require('./lib/routes')
		, express = require('express')
		, port = argv.port || 80
		, app = express()
	;

	route(app).listen(port);

})();
