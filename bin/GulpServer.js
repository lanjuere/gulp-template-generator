/**
 * Created by lionel on 11/11/2015.
 */


var path = require('path');
var appDir = path.dirname(require.main.filename);

var exec = require('child_process').exec;
var cmd = 'gulp  --gulpfile ' + appDir;

exec(cmd, function (error, stdout, stderr) {
    console.error("error : " + error.message);
    console.log(stdout);
    console.error(stderr);
});