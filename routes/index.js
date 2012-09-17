;(function() {
	
	var 
		routes = {

			connected : require('./get-connected')
			, connect : require('./post-connect')
			, status : require('./get-status')
			, plugin : require('./get-plugin')
			, index : require('./get-index')
		}
		, router = function(app) {

			Object.keys(routes).forEach(function(route) {
		
				module.exports[route] = routes[route](app);
			});

			return app;	
		}
	;

	module.exports = router;

})();
