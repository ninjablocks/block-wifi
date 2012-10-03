;(function() {
	
	module.exports = function(app) {

		app.get('/connected', function(req, res, next) {

			res.render('connected');
		});
	};

})();
