"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");


gulp.task('start', function() {
	nodemon({
		script: './index.js',
		ext: 'js html',
		env: {
			'APP_NAME': "coffeemaker",
			'DEBUG': 'app:*',
			'NODE_ENV': 'development',
			'PORT': 3000
		}
	})
})

gulp.task('default', ['start'])
