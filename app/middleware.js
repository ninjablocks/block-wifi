var 
	device = false
	, iface = undefined
	, connected = false
;

module.exports = function(app) {

	app.on('deviceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 
		
			device = false; return; 
		}

		device = true;
		app.send('resetWifi', true);
	});

	app.on('ifaceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 

			iface = undefined; return; 
		}

		iface = dat;
	});
	
	app.on('writeConfig', function(dat) {

		if((!dat) || ((dat) && dat.error)) {

			return;
		}

		app.send('syncDisk', true);
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
	};

	/**
	 * Convenience wrappers
	 */
	mids.ready = [ 

		mids.hasDevice
		, mids.hasIface 
	];

	mids.online = [ 

		mids.hasDevice
		, mids.hasIface
		, mids.isConnected 
	];

	return mids;
};
