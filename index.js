var fs = require('fs');
var wormhole;
if (fs.existsSync('../websocketrpc')) {
	wormhole = require('../websocketrpc');
} else {
	wormhole = require('websocketrpc');
}

var wormholeredis = function (socket, redisSub) {
	wormhole.call(this);
	this.redisSub = redisSub;
	this.rooms = [];
};
wormholeredis.prototype.__proto__ = wormhole.prototype;
wormholeredis.prototype.joinRoom = function(room, cb) {
	// Subscribe to room in redis.
	var subRoom = new wormholeredisRoom(room);
	this.rooms.push(subRoom);
	cb && cb(subRoom);
};
wormholeredis.prototype.leaveRoom = function (rooom) {
	// Unsubscribe from room in redis.
};
wormholeredis.prototype.onRoomMessage = function(room) {
	// Parse room message.
};

var wormholeredisRoom = function (name) {
	this.name = room;
};
wormholeredisRoom.prototype.onRoomMessage = function () {
	// Parse room message.
};
wormholeredisRoom.prototype.leaveRoom = function () {
	// Handle leaving room. Unsubscribe? Announce?
};
module.exports = wormholeredis;