;(function() {

	var cells = {};
	
	module.exports = function(app) {

		app.on('wifiScan', function(dat) {
			
			if((typeof dat !== "object") || dat.length < 1) { return; }

			dat.forEach(function(cell) {

				cells[cell.ssid] = cell;
			});
		});

		app.post('/connect', function(req, res, next) {
			
			var
				conf = {

					'ssid' : req.body.ssid
					, 'password' : req.body.password
				}
			;

			if(!cells[conf.ssid]) {

				return res.end("unknown network.");
			}

			cells[conf.ssid].password = conf.password;

			// request wlan0 cycle
			app.send('resetWifi', true);

			// request config write-out
			app.send("writeConfig", cells[conf.ssid]);

			res.render('connected');
		});
	};

})();
