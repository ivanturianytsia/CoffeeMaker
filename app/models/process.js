"use strict";

const EventEmitter = require('events');

module.exports = class Process extends EventEmitter {
	constructor() {
		super();

		this.desired = 200;
		this.user = undefined;
		this.reset();
	}
	getState(user) {
		if (!this.user) {
			this.user = user;
		}
		if (this.user === user) {
			return {
				success: true,
				running: this.running,
				desired: this.desired,
				mass: this.mass,
				time: this.time
			}
		} else {
			return {
				success: false,
				message: "Device busy."
			}
		}
	}
	setDesired(mass) {
		if (!this.running) {
			this.desired = mass;
		}
	}
	clearUser(user) {
		if (this.user === user) {
			this.user = undefined;
		}
	}
	reset() {
		this.time = 0;
		this.mass = 0;
		this.running = false;
		this.interval = undefined;
	}
	update() {
		this.time += 1;
		this.mass += 5;
		if (this.mass === this.desired) {
			this.reset();
		}
		this.emit("state");
	}
	start() {
		if (!this.running) {
			let that = this;
			this.running = true;
			this.interval = setInterval(() => {
				that.update();
			}, 1000);

			this.emit("state");
		}
	}
}
