var 
	device = false
	, iface = undefined
	, connected = false
	, cycling = false
	, state
;

module.exports = function(wifi, app) {

	/**
	 * When device comes up, try to bring the
	 * interface up as well
	 */
	app.on('deviceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 
		
			return device = false;
		}

		if(!device) {

			app.send('ifaceUp', true);
		}

		device = true;
	});

	app.on('ifaceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 

			return iface = undefined;
		}

		iface = dat;
	});
	
	/**
	 * When config has been written, sync
	 * to disc and start an iface cycle
	 */
	app.on('writeConfig', function(dat) {

		if((!dat) || ((dat) && dat.error)) {

			return;
		}
		cycling	= true;
		app.send('syncDisk', true);		
		app.send('ifaceDown', true);

	});

	/**
	 * Bring the iface back up if we are
	 * in the middle of cycling
	 */
	app.on('ifaceDown', function(dat) {

		if(!cycling) { return; }

		app.send('ifaceUp', true);
		state = setTimeout(function() {

			cycling = false;
		}, 10000);

	});

	/**
	 * Scan for networks when the iface 
	 * comes up. 
	 */
	 app.on('ifaceUp', function(dat) {

 		app.send('wifiScan', true);
	 });
	 
	/**
	 * Clear the cycle state if applicable
	 */
	app.on('ifaceUp', function(dat) {

		if(!cycling) { return; }

		clearTimeout(state);
		cycling = false;

	});

	/**
	* Could use a refactor
	*/
	var mids = {

		hasDevice : function(req, res, next) {

			if(!device) {

				return res.redirect('/plugin');
			}
			next();
		}
		, hasIface : function(req, res, next) {

			if(!iface) {

				return res.redirect('/plugin');
			}
			next();
		}
		, isConnected : function(req, res, next) {

			// check for AP association
			next();
		}
		, notCycling : function(req, res, next) {

			if(cycling) {

				return res.redirect('/plugin');
			}
			next();
		}
		, hasSerial : function(req, res, next) {

			if(!wifi.serial) {

				return res.redirect('/serial');
			}
			next();
		}
		, userAuth : function(req, res, next) {

			if((req.session) && req.session.block) { // session already checked

				if(req.session.block == wifi.serial) {
					
					wifi.log.debug("User has proper credentials in session");
					return next();
				}
				wifi.log.info("User has invalid credential in session");
			}
			if((req.query) && req.query.block) { // check new session

				if(req.query.block == wifi.serial) {

					req.session.block = req.query.block;
					wifi.log.info("User provided proper credentials");
					return next();
				}
				wifi.log.info("User provided invalid credentials");
			}
			wifi.log.debug("Redirecting unauthed user to auth screen");
			res.redirect('/auth');
		}
	};

	/**
	 * Convenience wrappers
	 */
	mids.ready = [ 

		mids.hasSerial
		, mids.hasDevice
		, mids.hasIface 
		, mids.notCycling
	];

	mids.online = [ 

		mids.hasSerial
		, mids.hasDevice
		, mids.hasIface
		, mids.isConnected 
	];

	return mids;
};
