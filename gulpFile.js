var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('default', function () {

    nodemon({
            script: "index.js",
            ext: "js",
            env: {
                PORT: 8000
            },
            ignore: ['./node_modules/*.*', './public/*.*']

        })
        .on('restart', function () {

            console.log('GULP -RESTART');

        });
});