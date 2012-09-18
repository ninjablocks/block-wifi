var 
	device = undefined
	, iface = undefined
	, connected = false
;

module.exports = function(app) {
	
	app.on('device::up', function(dat) {

		device = dat.device;
	});

	app.on('device::down', function(dat) {

		device = undefined;
	});

	app.on('iface::up', function(dat) {

		device = dat.iface;
	});

	app.on('iface::down', function(dat) {

		device = undefined;
	});
	app.on('connection::up', function(dat) {

		connected = true;
	});

	app.on('connection::down', function(dat) {

		connected = false;
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
		, hasIface : function(req, ers, next) {

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
