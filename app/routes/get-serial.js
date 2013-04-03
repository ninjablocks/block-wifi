module.exports = function(app) {

	app.get('/serial', function(req, res, next) {

		app.log.info("Rendering serial screen.");
		res.render('serial');
		
	});
};
