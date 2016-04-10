var gulp =  require('gulp');
var jshint =  require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => 
          gulp.src(jsFiles)
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
          .pipe(jscs())
         );

gulp.task('inject', () => {
    
    var wiredep = require('wiredep').stream;
    
    var options = {
          bowerJson: require('./bower.json'),
          directory: './static/lib',
          ignorePath: '../../static/'  
          };
        
    return gulp.src('./src/views/*.html')
    
         .pipe(wiredep(options))
         .pipe(gulp.dest('./src/views'));
});