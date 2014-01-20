var fs = require('fs');
var wormhole;
if (fs.existsSync('../websocketrpc')) {
	wormhole = require('../websocketrpc');
} else {
	wormhole = require('websocketrpc');
}

var wormholeredis = function () {
	wormhole.call(this);
};
wormholeredis.prototype.__proto__ = wormhole.prototype;