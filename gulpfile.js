// Include gulp
global.gulp = require('gulp');

// Include Our Plugins
global.argv = require('yargs').argv;
global.jshint = require('gulp-jshint');
global.sass = require('gulp-sass');
global.concat = require('gulp-concat');
global.uglify = require('gulp-uglify');
global.rename = require('gulp-rename');
global.fileUtils = require('./app/utils/FilesNames');

//Init options from parameters
var Options = require('./app/beans/Options');
var options = new Options(argv.path);

//create tasks
require('./app/tasks/Libs').createTask(options);
require('./app/tasks/Lint').createTask(options);
require('./app/tasks/Sass').createTask(options);
require('./app/tasks/Scripts').createTask(options);
require('./app/tasks/Browserify').createTask(options);
require('./app/tasks/Watch').createTask(options);


// Default Task
gulp.task('default', ['lint', 'sass', 'libs', 'browserify', 'watch']);