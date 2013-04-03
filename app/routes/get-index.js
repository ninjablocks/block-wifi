;(function() {
	
	module.exports = function(app, mids) {

		app.get('/', mids.ready, function(req, res, next) {

			app.log.info("Rendering index screen.");
			res.render("index");

		});
	};

})();
