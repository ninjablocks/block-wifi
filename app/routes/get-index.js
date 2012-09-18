;(function() {
	
	module.exports = function(app, mids) {

		app.get('/', mids.ready, function(req, res, next) {

			res.render("index");

		});
	};

})();
