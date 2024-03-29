var gulp =  require('gulp');
var jshint =  require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
          gulp.src(jsFiles)
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
          .pipe(jscs());
         });

gulp.task('inject', function() {
    
    var injectSource = gulp.src(
      ['./static/css/*.css', './static/js/*.js'], 
      {
        read: false
      });

    var injectOptions = {
      ignorePath: '/static'
    };

    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var wiredepOptions = {
          bowerJson: require('./bower.json'),
          directory: './static/lib',
          ignorePath: '../../static'  
          };
        
    return gulp.src('./src/views/*.ejs')    
         .pipe(wiredep(wiredepOptions))
         .pipe(inject(injectSource, injectOptions))
         .pipe(gulp.dest('./src/views'));
       });

gulp.task('serve', ['style', 'inject'], function() {
    var nodemonOptions = {
      script: 'app.js',
      env: {
          PORT:2526
      },
      delayTime: 1,
      watch: jsFiles
    };

    return nodemon(nodemonOptions)
           .on('restart', function(evnt) {
              console.log('Restarting the server...');
              });
});