;(function() {
	
	var 
		check = function() {

			$.ajax({

				type : "GET"
				, url : "/device"
				, dataType : "JSON"
				, success : connected
				, failure : error
			})
		}
		, connected = function(dat) {

			if((dat)) {

				if(dat.device) {

					/**
					 * Reload and let the app reroute
					 * us appropriately.
					 */
					window.location.href = '/';
				}
				else {

					/**
					 * Wait for them to plug it in
					 */
					setTimeout(check, 1000);
				}
			}
		}
		, error = function() {

			/**
			 * Oh well, let's try again.
			 */
			setTimeout(check, 1000);
		}
	;

	$(check);

})();