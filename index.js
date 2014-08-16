'use strict';
var through2 = require('through2'),
    gutil = require('gulp-util'),
    kclean = require('kclean'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path');


module.exports = function(opt) {
    opt = opt || {};
    var files = opt.files,
        options = opt.options||{},
        minify = opt.minify;

    return through2.obj(function (file, enc, callback ) {

            if (file.isNull()) {
                this.push(file);
                return cb();
            }

            if (file.isStream()) {
                this.emit('error', new gutil.PluginError('gulp-kmc', 'Streaming not supported'));
                return cb();
            }

            var has =  false, cleanFile;
            files.forEach(function(_file){
                if(path.resolve(_file.src) == path.resolve(file.path)){
                    has = true;
                    cleanFile = _file;
                    return false;
                }
            });


            if(has) {

                try{
                    var code = kclean.clean(file.contents.toString(),_.extend({prefixMode:"camelCase"},options,cleanFile));
                    file.contents = new Buffer(code);
                    gutil.log('cleaned  file ' + gutil.colors.green(cleanFile.src) + ' is created.');

                }catch(err){
                    this.emit('error', new gutil.PluginError('gulp-clean', err));
                }
            }

            this.push(file);
            return callback();
        });
  }