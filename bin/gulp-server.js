#!/usr/bin/env node
/**
 * Created by lionel on 11/11/2015.
 * This bin launch gulp with the path of current gulpfile and path to project gulpSettings
 */

var path = require('path');
var appDir = path.dirname(require.main.filename);

var spawn = require('win-spawn');
var gulpFileName = '/../gulpfile.js';

var gulp = spawn('gulp', ['--gulpfile', appDir + gulpFileName, '--path', process.cwd()]);


var hours = null;
gulp.stdout.on('data', function (data) {
    //Data is a buffer object. we need to convert it into string
    //Hours and messages are split. We need to display it on the same line.
    var output = (data + "").trim();
    var lastCharacter = output.trim().slice(-1);
    if (!hours && lastCharacter == ']') {
        hours = data + "";
    } else {
        console.log(hours ? hours + output : output);
        hours = null;
    }

});

gulp.stderr.on('data', function (data) {
    console.error(data + "");
});

gulp.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
