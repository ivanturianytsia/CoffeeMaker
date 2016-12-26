"use strict";

const app = require("./app/server.js");

const port = process.env.PORT;

app.listen(port, () => {
	console.log('Magic happens at http://localhost:' + port);
});
