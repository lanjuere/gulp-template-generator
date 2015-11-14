/**
 * Created by lionel on 01/11/2015.
 */

function TaskSass() {

    this.createTask = function (options) {

        // Compile Our Sass
        gulp.task('sass', function () {
            return gulp.src('scss/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('css'));
        });
    }

}

module.exports = new TaskSass();