var fs = require('fs');
var events = require('events');
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

	this.onRoomMessage = this.onRoomMessage.bind(this);
};
wormholeredis.prototype.__proto__ = wormhole.prototype;
wormholeredis.prototype.joinRoom = function(room, cb) {
	// Subscribe to room in redis.
	var self = this;
	var subRoom = new wormholeredisRoom(room);
	subRoom.on("message", this.onRoomMessage);
	this.rooms.push(subRoom);
	cb && cb(null, subRoom);
	this.socket.on("disconnect", function () {
		self.leaveRoom(subRoom);
	});
};
wormholeredis.prototype.leaveRoom = function (room) {
	// Unsubscribe from room in redis.
	this.rooms.splice(this.rooms.indexOf(room), 1);
	room.leaveRoom();
};
wormholeredis.prototype.onRoomMessage = function(room, message) {
	// Parse room message.
	if (message) {
		var sigTest = JSON.parse(message);
		if (sigTest.signature && sigTest.signature.__hash__) {
			// Contains an RPC signature. Let's not enforce equal RPC functions. That would be silly.
		} else {
			this.emit("message", room, message);
		}
	}
};

//
// Room constructor. Do room specific tings, yo!
//
var wormholeredisRoom = function (name, redisSub) {
	events.EventEmitter.call(this);
	var self = this;
	this.name = room;
	this.redisSub = redisSub;
	this.onRoomMessage = this.onRoomMessage.bind(this);
	redisSub.on("wormholeRoom:"+name, this.onRoomMessage);
};
wormholeredisRoom.prototype.onRoomMessage = function (message) {
	// Parse room message.
	this.emit("message", this, message);
};
wormholeredisRoom.prototype.leaveRoom = function () {
	// Handle leaving room. Unsubscribe? Announce?
	this.redisSub.removeListener("wormholeRoom:"+name, this.onRoomMessage);
	this.removeAllListeners();
};
wormholeredisRoom.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = wormholeredis;