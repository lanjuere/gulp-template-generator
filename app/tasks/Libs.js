/**
 * Created by lionel on 01/11/2015.
 */

function TaskLibs() {

    this.createTask = function (options) {

        // Concatenate & Minify JS
        gulp.task('libs', function () {
            return gulp.src(options.js.lib)
                .pipe(concat(fileUtils.createJsNameFile(options.js.libName, false)))
                .pipe(gulp.dest(options.js.dest))
                .pipe(rename(fileUtils.createJsNameFile(options.js.libName, true)))
                .pipe(uglify())
                .pipe(gulp.dest(options.js.dest));
        });

    }

}

module.exports = new TaskLibs();