;(function() {
	
	module.exports = function(app) {

		app.post('/connect', function(req, res, next) {

			var 
				basestation = req.params.basestation.split(',')
				, password = req.params.password
			;

			// parse basestation information

			// cycle wlan0
			// write-out supplicant

			res.end("ohai");
		});
	};

})();
