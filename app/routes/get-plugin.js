;(function() {
	
	module.exports = function(app, mids) {

		app.get('/plugin', function(req, res, next) {

			app.log.info("Rendering plugin screen.");
			res.render("plugin");
		});
	};
	
})();
