;(function() {

	var 
		device = false
		, calls = 0
	;
	
	module.exports = function(app) {

		app.on('deviceCheck', function(dat) {

			--calls;
			if(!dat) { return device = false; }
			device = true;
		});

		app.get('/device', function(req, res, next) {

			if(calls++ <= 1) {

				app.send('deviceCheck', true);
			}
			res.json({ 'device' : device });
		});
	};

})();
