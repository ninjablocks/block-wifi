;(function() {
	
	module.exports = function(app) {

		app.get('/connected', function(req, res, next) {

			// render an actual page
			res.end(
				"The Wi-Fi on your Ninja Block is now setup. " +
				"Please unplug the ethernet and restart " +
				"your block to begin using Wi-Fi."
			);
		});
	};

})();
