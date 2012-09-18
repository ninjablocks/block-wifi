;(function() {
	
	module.exports = function(app, mids) {

		app.get('/plugin', function(req, res, next) {

			res.end("Plug it in.");
		});
	};
	
})();
