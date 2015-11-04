/**
 * Created by lionel on 01/11/2015.
 */

function TaskWatch() {

    this.createTask = function (options) {



        // Watch Files For Changes
        gulp.task('watch', function () {
            gulp.watch(options.js.src, ['lint', 'scripts']);
            gulp.watch('scss/*.scss', ['sass']);
        });
    }

}

module.exports = new TaskWatch();