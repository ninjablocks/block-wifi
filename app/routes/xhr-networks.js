;(function() {

	var cells = [];
	
	module.exports = function(app) {

		app.on('wifiScan', function(dat) {
			
			if((typeof dat !== "object") || dat.length < 1) { return; }

			cells = dat;
		});

		app.get('/networks', function(req, res, next) {

			res.json({ 'networks' : cells });
		});
	};

})();
