"use strict";

const express = require('express');

const log = require('debug')('app:server');
const error = require('debug')('app:error');

const app = express();

const server = require('http').Server(app);

// use morgan to log requests to the console
// app.use(morgan('dev'));

// Server static files
app.use(express.static(__dirname + '/public'));

// routes
const homeRoutes = require("./controllers/home");
const socket = require("./controllers/socket")(server);

app.use('/', homeRoutes.router);


module.exports = server;
