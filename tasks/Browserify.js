/**
 * Created by lionel on 01/11/2015.
 */

var browserify = require('gulp-browserify');

function TaskBrowserify() {

    this.createTask = function (options) {

        gulp.task('browserify', function () {
            //FIXME Can"t change file name ...
            return gulp.src(options.js.src)
                .pipe(browserify())
                //.pipe(rename(fileUtils.createJsNameFile(options.js.name, false)))
                //.pipe(gulp.dest(options.js.dest))
                //.pipe(rename(fileUtils.createJsNameFile(options.js.name, false)))
                //.pipe(uglify())
                .pipe(gulp.dest(options.js.dest))
            //.pipe(rename(fileUtils.createJsNameFile(options.js.name, false)))
            //.pipe(gulp.dest(options.js.dest));
        });

    }
}

module.exports = new TaskBrowserify();