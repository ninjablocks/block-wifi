;(function() {
	
	var networks = function() {

		$.ajax({

			type : 'GET'
			, url : '/networks'
			, dataType : 'JSON'
			, success : networkList
			, failure : networks
		})
	};

	var option = function(o) {

		if(!o.address || !o.ssid) { return null; }
		return $('<option>')

			.attr('value', o.address)
			.html(o.ssid)
		;
	};

	var networkList = function(dat) {

		console.log(dat);

		if((dat) && (dat.networks)) {

			var 
				list = dat.networks.map(option)
				, select = $('#networks')
			;

			list.forEach(function(option) {

				select.append(option);
			})
		}
		else {

			// some error happened.
		}
	};

	$(networks);	

})();
