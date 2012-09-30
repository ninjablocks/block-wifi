var 
	device = false
	, iface = undefined
	, connected = false
;

module.exports = function(app) {

	app.on('deviceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 
		
			console.log("System has no device.");
			device = false; return; 
		}

		device = true;
	});

	app.on('ifaceCheck', function(dat) {

		if((!dat) || ((dat) && dat.error)) { 

			console.log("System has no interface.");
			iface = undefined; return; 
		}

		iface = dat;
	});
	
	var mids = {

		hasDevice : function(req, res, next) {

			if(!device && !iface) {

				return res.redirect('/plugin');
			}
			else if(!iface) {

				// add route to ask for reboot 
				// possibly faulty hardware, etc
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
