/**
 * Created by lionel on 01/11/2015.
 */

function fileUtils() {


    this.createJsNameFile = function (name, isMin) {
        var file = isMin ? name : name + '.min';
        return file + '.js';
    };
}


module.exports = new fileUtils();