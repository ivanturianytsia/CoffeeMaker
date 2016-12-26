"use strict";

const path = require("path");

const log = require('debug')('app:page-controller');
const error = require('debug')('app:error');

let home = function(req, res, next) {
	res.sendFile(path.join(__dirname, '../../', 'main.html'));
}

module.exports = {
	home
}
