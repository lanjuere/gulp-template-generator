/**
 * Created by lionel on 01/11/2015.
 */

var browserify = require('browserify');
var source = require('vinyl-source-stream');


function TaskBrowserify() {

    this.createTask = function (options) {

        gulp.task('browserify', function () {
            //TODO changer le lien src par le nom de l'application !
            return browserify(options.js.src)
                .bundle()
                .pipe(source(fileUtils.createJsNameFile(options.js.name, false)))
                .pipe(gulp.dest(options.js.dest))
                .pipe(rename(fileUtils.createJsNameFile(options.js.name, true)))
                .pipe(uglify())
                .pipe(gulp.dest(options.js.dest));
        });

    }
}

module.exports = new TaskBrowserify();