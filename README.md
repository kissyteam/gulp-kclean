gulp-kclean
===========

[kclean](https://github.com/kissyteam/kclean) plugin for gulp

### how to use
```js
var kclean = require('gulp-kclean');

//kissy
gulp.task("kclean", function() {
    gulp.src("./combo/*.js")
        .pipe(kclean({
            files:[{
                        src:'init-min.js',
                        outputModule:'udata/init'
                  }]
        }))
        .pipe(gulp.dest("./build"))
});

//sea.js
gulp.task("kclean", function() {
    gulp.src("./combo/*.js")
        .pipe(kclean({
            files:[{
                        src:'init-min.js',
                        outputModule:'udata/init'
                  }]
        }))//配置与kissy一样，kclean内部会自动识别代码风格
        .pipe(gulp.dest("./build"))
});

//原生js
gulp.task("kclean", function() {
    gulp.src("./combo/*.js")
        .pipe(kclean({
            options:{
                wrap:{
                    start:"(function(){",
                    end:"})();"
                }
            },
            files:[{
                        src:'init-min.js',
                        outputModule:'udata/init'
                  }]
        }))//配置与kissy一样，kclean内部会自动识别代码风格
        .pipe(gulp.dest("./build"))
});

```
