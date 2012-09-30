var 
	exec = require('child_process').exec
	, opts = { timeout : 10000 }
	, fs = require('fs')
	, path = require('path')
	, util = require('util')
	, confPath = '/etc/wpa_supplicant.conf'
	, writeConfig = function(conf) {

		var fd = fs.createWriteStream(confPath);

		fd.on('error', function(err) {

			process.send({ 'action' : 'writeConfig', error : err });
			fd.end();
		});

		fd.write("ctrl_interface=/var/run/wpa_supplicant\n");
		fd.write("network={\n");
		fd.write(util.format("\tssid=\"%s\"\n", conf.ssid));
		fd.write(util.format("\tpsk=%s\n", conf.password));
		fd.end("}\n");

		process.send({ 'action' : 'writeConfig', data : true });
	}
;

module.exports = writeConfig;
