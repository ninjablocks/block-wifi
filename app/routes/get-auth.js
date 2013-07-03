module.exports = function(app) {

	app.get('/auth', function(req, res, next) {

		app.log.info("Rendering auth screen.");
		res.render('auth');
		
	});
};
