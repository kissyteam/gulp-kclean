'use strict';
var through2 = require('through2'),
    gutil = require('gulp-util'),
    kclean = require('kclean'),
    fs = require('fs'),
    path = require('path');


module.exports = function(opt) {
    opt = opt || {};
    var files = opt.files,
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
                if(path.resolve(_file.path) == path.resolve(file.path)){
                    has = true;
                    cleanFile = _file;
                    return false;
                }
            });


            if(has) {

                try{
                    var code = kclean.clean(file.contents.toString(), {
                                                         minify:minify,
                                                         prefixMode:"camelCase",
                                                         outputModule:cleanFile.outputModule
                                                  });
                    file.contents = new Buffer(code);
                    gutil.log('cleaned  file ' + gutil.colors.green(cleanFile.path) + ' is created.');

                }catch(err){
                    this.emit('error', new gutil.PluginError('gulp-clean', err));
                }
            }

            this.push(file);
            return callback();
        });
  }