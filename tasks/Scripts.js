/**
 * Created by lionel on 01/11/2015.
 */

function TaskScripts() {

    this.createTask = function (options) {


        // Concatenate & Minify JS
        gulp.task('scripts', function () {
            return gulp.src(options.js.src)
                .pipe(concat(fileUtils.createJsNameFile(options.js.name, false)))
                .pipe(gulp.dest(options.js.dest))
                .pipe(rename(fileUtils.createJsNameFile(options.js.name, true)))
                .pipe(uglify())
                .pipe(gulp.dest(options.js.dest));
        });
    }

}

module.exports = new TaskScripts();