var 
	filter = function(arr) {

		return arr.filter(function(e) { return e == '' ? false : true });
	}
	, cell = undefined
;

module.exports = [ 
	{
		name : 'cell' // beginning of an AP definition
		, pattern : /Cell ([0-9][0-9])/
		, handle : function(cells) {

			var 
				dat = filter(this.split(' '))
			;
			cell = {};
			cell.address = dat[4];
			cells[cells.length] = cell;
			return true;
		}
	}
	, {
		name : 'name' // network name (SSID)
		, pattern : /ESSID/
		, handle : function() {

			cell
				.name = this.split(':')[1].replace(/"/g, '') || 
					'Unnamed Network'
			;

			return false;
		}
	}
	, {
		name : 'encryption' // encryption status
		, pattern : /Encryption key/
		, handle : function() {

			cell
				.encryption = this.split(':')[1] || '' == 'on' ? 
					true : false
			;

			return false;
		}
	}
	, {
		name : 'enc-type' // WPA
		, pattern : /IE: WPA .+ [0-9]/
		, handle : function() {

			cell
				.encType = 'WPA' + filter(this.split(' '))[3]
			;

			return false;
		}
	}
	, {
		name : 'enc-type2' // WPA 2
		, pattern : /IE: IEEE 802.11i\/WPA.+[0-9]/
		, handle : function() {

			cell
				.encType = 'WPA2'
			;

			return false;
		}
	}
	, {
		name : 'auth' // auth types available
		, pattern : /Authentication Suites/
		, handle : function() {

			cell
				.auth = filter(this.split(' '))[4]
			;

			return false;
		}
	}
];