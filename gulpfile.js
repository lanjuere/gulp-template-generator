// Include gulp
global.gulp = require('gulp');

// Include Our Plugins
global.argv = require('yargs').argv;
global.jshint = require('gulp-jshint');
global.sass = require('gulp-sass');
global.concat = require('gulp-concat');
global.uglify = require('gulp-uglify');
global.rename = require('gulp-rename');
global.fileUtils = require('./utils/FilesNames');

//Init options from parameters
var Options = require('./beans/Options');
var options = new Options(argv.path);

//create tasks
require('./tasks/Libs').createTask(options);
require('./tasks/Lint').createTask(options);
require('./tasks/Sass').createTask(options);
require('./tasks/Scripts').createTask(options);
require('./tasks/Watch').createTask(options);
require('./tasks/Browserify').createTask(options);


// Default Task
gulp.task('default', ['lint', 'sass', 'libs', 'scripts', 'watch']);