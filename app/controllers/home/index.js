"use strict";

const express = require('express');

const controller = require('./home.controller.js');

let router = express.Router();

router.get("/", controller.home);

module.exports.router = router;
