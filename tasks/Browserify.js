/**
 * Created by lionel on 01/11/2015.
 */

var transform = require('vinyl-transform');
var browserify = require('browserify');


function TaskBrowserify() {

    this.createTask = function (options) {


        gulp.task('browserify', function () {

            var browserified = browserify(options.js.src);
            var bundle = transform(function (filename) {
                return browserified.bundle();
            });


            return gulp.src(options.js.src)
                .pipe(bundle)
                .on('error', function (err) {
                    console.error(err.message);
                    this.emit('end');
                })
                .pipe(gulp.dest(options.js.dest));
            ;
        });


    }
}

module.exports = new TaskBrowserify();