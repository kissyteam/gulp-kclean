gulp-kclean
===========

[kclean](https://github.com/kissyteam/kclean) plugin for gulp

### how to use
```js
var kclean = require('gulp-kclean');
gulp.task("udata", function() {
    gulp.src(src.udata)
        .pipe(kmc.convert({
            minify:true
        }))
        .pipe(kmc.combo({
             minify:true,
             files:[{
                       src: './server/udata/init.js',
                       dest: '../userver/build/udata/combo.js'
                   }]
         }))
        .pipe(kclean({
            minify:true,
            files:[{
                        path:'../userver/build/udata/combo-min.js',
                        outputModule:'udata/init'
                  }]
        }))
        .pipe(gulp.dest(path.join(userverPath,"udata")))
        .on("end", function() {
             gulp.src(path.join(userverPath,"udata/combo-min.js"))
                 .pipe(rename("init-min.js"))
                 .pipe(gulp.dest(path.join(userverPath,"udata")));
        });
});
```
