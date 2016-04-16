var gulp =  require('gulp');
var jshint =  require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => 
          gulp.src(jsFiles)
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
          .pipe(jscs())
         );

gulp.task('inject', () => {
    
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
          ignorePath: '../../static/'  
          };
        
    return gulp.src('./src/views/*.hbs')    
         .pipe(wiredep(wiredepOptions))
         .pipe(inject(injectSource, injectOptions))
         .pipe(gulp.dest('./src/views'));
       });

gulp.task('serve', ['style', 'inject'], () => {
    var nodemonOptions = {
      script: 'app.js',
      env: {
          PORT:2526
      },
      delayTime: 1,
      watch: jsFiles
    };

    return nodemon(nodemonOptions)
           .on('restart', (evnt) => {
              console.log('Restarting the server...');
              })
});