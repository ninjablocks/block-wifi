;(function() {
	
	module.exports = function(app) {

		app.get('/status', function(req, res, next) {

			// if we have wlan0, say "up", otherwise; "down"

			res.end("down");
		});
	};
	
})();