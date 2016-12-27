"use strict";

const Process = require("../../models/process.js")

module.exports = server => {
	const io = require('socket.io')(server);

	let process = new Process();

	io.on('connection', function(socket) {
		let user = socket.id;

		socket.emit('state', process.getState(user));


		process.on("state", function() {
			socket.emit('state', process.getState(user));
		})
		socket.on('desired', function(data) {
			process.setDesired(data);
			socket.emit('state', process.getState(user));
		});
		socket.on('start', function() {
			process.start();
			socket.emit('state', process.getState(user));
		});
		socket.on('disconnect', function() {
			process.clearUser(user);
		});
	});
}
