;(function() {
	
	module.exports = function(app) {

		app.get('/plugin', function(req, res, next) {

			// render a plug-it-in page.
			res.end("Plug it in.");
		});
	};
	
})();
