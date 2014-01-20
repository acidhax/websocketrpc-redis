var fs = require('fs');
var wormhole;
if (fs.existsSync('../websocketrpc')) {
	wormhole = require('../websocketrpc');
} else {
	wormhole = require('websocketrpc');
}

var wormholeredis = function (redisSub) {
	wormhole.call(this);
	this.redisSub = redisSub;
};
wormholeredis.prototype.__proto__ = wormhole.prototype;
wormholeredis.prototype.joinRoom = function(room) {
	// Subscribe to room in redis.
};
wormholeredis.prototype.leaveRoom = function (rooom) {
	// Unsubscribe from room in redis.
};
module.exports = wormholeredis;