/**
 * Created by lionel on 01/11/2015.
 */

var browserify = require('browserify');
var through2 = require('through2');

function TaskBrowserify() {

    var self = this;

    self.createTask = function (options) {
        gulp.task('browserify', function () {
            var bundle = null;
            try {
                bundle = self.createBundle(options);
            } catch (err) {
                console.error(err.message);
                bundle = null;
            }

            return bundle;
        });
    }


    self.createBundle = function (options) {
        gulp.src(options.js.src)
            .pipe(through2.obj(function (file, enc, next) {
                browserify(file.path)
                    .transform('stripify')
                    .bundle(function (err, res) {
                        // assumes file.contents is a Buffer
                        if (self.isBuffer(res)) {
                            file.contents = res;
                            next(null, file);
                        } else {
                            console.error(err.message);
                        }
                    });
            })).on('error', function (err) {
                console.error(err.message);
                this.emit('end');
            })
            .pipe(gulp.dest(options.js.dest));
    }

    /**
     * Verify if object is a readable stream
     * @param obj
     * @returns {boolean|string}
     */
    self.isBuffer = function (obj) {
        return obj instanceof Buffer;
    }
}

module.exports = new TaskBrowserify();