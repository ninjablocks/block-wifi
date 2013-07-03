var
	fs = require('fs')
	, path = require('path')
	, existsSync = fs.existsSync || path.existsSync
;

/**
 * Hacked from Ninja Blocks credential provider
 */
function credentials(opts) {

	this.opts = opts;
	this.token = undefined;
	this.serial = undefined;

	this.loadSerial = loadCred.bind(this, 'serial');

	var serial = this.loadSerial();
	if(!serial) {

		this.log.error("Unable to load serial from file");
	}

	return this;
};

function bindMethod(method) {

	var
		cred = method.substr(4).toLowerCase()
		, action = method.substr(0, 4)
	;

	this[method] = credManager.bind(this, action, cred);
};

function credManager(action, cred) {

	if(action == 'save') {

		saveCred.call(this, cred);
	}
	else if(action == 'load') {

		loadCred.call(this, cred);
	}
};

function saveCred(cred) {

	var cFile = credFile.call(this, cred);
	if(!cFile) {

		this.log.error('Unable to save %s to file (no path specified)', cred);
		return false;
	}
	this.log.debug('Attempting to save %s to file...', cred);
	try {

		fs.writeFileSync(cFile, this[cred]);
	}
	catch(e) {

		this.log.error('Unable to save %s file (%s)', cred, e);
		return false;
	}
	this.log.info('Successfully saved %s to file', cred);
	return true;
};

function loadCred(cred) {

	var contents = ''
		, cFile = credFile.call(this, cred);

	if(!cFile) {

		this.log.error('Unable to load %s from file (no path specified)', cred);
		return false;
	}
	try {

		if (existsSync(cFile)) {

			contents = fs.readFileSync(cFile, 'utf8');
		}
	}
	catch(e) {

		this.log.error('Unable to load %s from file (%s)', cred, e);
		return false;
	}
	this[cred] = contents.replace(/\n/g, '');
	this.log.info('Successfully loaded %s from file: %s', cred, this[cred]);
	return true;
};

function credFile(cred) {

	return this.opts[cred + 'File'] || undefined;
};

module.exports = credentials;
