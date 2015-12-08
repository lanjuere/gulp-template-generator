/**
 * Object containing all datas paths
 **/
function Options(path, name) {

    var default_name = "gulp_settings.json";
    var separator = "/";

    var parameters = {
        lib: "",
        src: "",
        dest: "",
        libName: "",
        name: "",
        dir: ""
    };
    //parameters who need the complet path of project
    var dir_parameters = ['lib', 'src', 'dest', 'dir'];

    this.js = {};
    this.css = {};


    var self = this;

    this._contructor = function (path, name) {
        if (!path) {
            self.clone(parameters, self.js);
            self.clone(parameters, self.css);
        } else {
            var file_name = name ? name : default_name;
            self.clone(require(path + separator + file_name), this);
            self.addPath(dir_parameters, path);
        }
    };

    this.addPath = function (attrs, path) {
        for (i in attrs) {
            self.js[attrs[i]] = path + self.js[attrs[i]];
            self.css[attrs[i]] = path + self.css[attrs[i]];
        }
    };

    this.clone = function (src, dest) {
        for (attr in src) {
            dest[attr] = src[attr];
        }
    };

    this._contructor(path, name);
}

module.exports = Options;