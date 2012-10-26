var 
	device = false
	, iface = undefined
	, connected = false
	, cycling = false
	, state
;

module.exports = function(app) {

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
	
	app.on('writeConfig', function(dat) {

		if((!dat) || ((dat) && dat.error)) {

			return;
		}
		cycling	= true;
		app.send('syncDisk', true);		
		app.send('ifaceDown', true);

	});

	app.on('ifaceDown', function(dat) {

		if(!cycling) { return; }

		app.send('ifaceUp', true);
		state = setTimeout(function() {

			cycling = false;
		}, 10000);

	});

	app.on('ifaceUp', function(dat) {

		if(!cycling) { return; }

		clearTimeout(state);
		cycling = false;
		
	});

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
	};

	/**
	 * Convenience wrappers
	 */
	mids.ready = [ 

		mids.hasDevice
		, mids.hasIface 
		, mids.notCycling
	];

	mids.online = [ 

		mids.hasDevice
		, mids.hasIface
		, mids.isConnected 
	];

	return mids;
};
