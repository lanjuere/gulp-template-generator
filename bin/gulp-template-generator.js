#!/usr/bin/env node
/**
 * Created by lionel on 14/11/2015.
 */


//TODO CLEAN THE CODE !!!

var readline = require('readline');
var spawn = require('win-spawn');
var ncp = require('ncp').ncp;
var parameters = require('../assets/parameters');
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename) + "/..";

function fillParam(param) {
    var reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    askQuestion(reader, param);
}

function askQuestion(reader, param) {
    reader.question(param.title, function (answer) {
        if (!answer && !param.require) {
            param.value = param.default;
            reader.close();
            nextParam();
        } else if (answer) {
            param.value = answer;
            reader.close();
            nextParam();
        } else {
            askQuestion(reader, param);
        }
    });
}

var index = 0;
function nextParam() {
    if (parameters.length > index) {
        fillParam(parameters[index++]);
    } else {
        generateProject();
    }
}

function generateProject() {

    var targetDir = process.cwd() + "/" + parameters[0].value;


    console.log();
    console.log("generate project in this path : " + targetDir);

    mkdirSync(targetDir);
    ncp.limit = 16;
    //copy app
    var app_dir = "/app";
    ncp(appDir + app_dir, targetDir + app_dir, function (err) {
            if (err) {
                return console.error(err);
            }
        }
    );

    //copy gulpfile
    var gulpfile = "/gulpfile.js";
    ncp(appDir + gulpfile, targetDir + gulpfile, function (err) {
        if (err) {
            return console.error(err);
        }
    });

    fs.readFile(appDir + "/generator_package.json", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data;
        for (var i in parameters) {
            result = result.split("{{" + parameters[i].label + "}}").join(parameters[i].value);
            //result = result.replace("{{" + parameters[i].label + "}}", parameters[i].value);
        }
        fs.writeFile(targetDir + "/package.json", result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });


    //copy bin
    var gulpServer = "/bin/gulp-server.js";

    mkdirSync(targetDir + "/bin");
    ncp(appDir + gulpServer, targetDir + gulpServer, function (err) {
        if (err) {
            return console.error(err);
        }
        install(targetDir);
    });

}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}


function install(targetDir) {
    var npm = spawn('npm', ['install', '-g', targetDir]);
    console.log("installation en cours... (cela peut prendre quelques minutes)");
    npm.stdout.on('data', function (data) {
        console.log(data + "");
    });

    npm.stderr.on('data', function (data) {
        console.error(data + "");
    });

    npm.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });

}

nextParam();



