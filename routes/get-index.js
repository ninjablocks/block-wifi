;(function() {
	
	module.exports = function(app) {

		app.get('/', function(req, res, next) {


			// greet user
			// scan for wifi networks

			res.end("hello");
		});
	};

})();
