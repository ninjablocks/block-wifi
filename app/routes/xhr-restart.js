;(function() {
	

	var 
		restarting = false
		, restart = function() {

			restarting = true;
			app.send('syncDisk', true);
		}
	;

	module.exports = function(app) {

		app.on('syncDisk', function(dat) {

			if(restarting) {

				/**
				 * implement auth token here, so we aren't letting
				 * just anyone issue restart requests to our block
				 */
				app.send('restartBlock', { 'token' : undefined });
				restarting = false;
			}

		});

		app.get('/restart', function(req, res, next) {

			restart();
			res.json({ 'restart' : true });
		});
	};

})();
