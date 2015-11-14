/**
 * Created by lionel on 01/11/2015.
 */

function TaskLint() {

    this.createTask = function (options) {

        // Lint Task
        gulp.task('lint', function () {
            return gulp.src(options.js.src)
                .pipe(jshint())
                .pipe(jshint.reporter('default'));
        });
    }

}

module.exports = new TaskLint();