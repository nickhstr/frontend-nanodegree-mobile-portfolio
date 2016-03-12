## Website Performance Optimization:
Launch the URL for [index.html](http://nickhstr.github.io/frontend-nanodegree-mobile-portfolio/)

### Optimizations Performed
1. Inline CSS styling:
    - landing-page.html - embedded the style.css file
    - added media="print" for print.css since it is render blocking
2. Optimized images, compressed with Gulp using gulp-imagemin
    - For views/pizzeria.jpg, the image was resized and copied using Preview for OS X
3. Added async attribute for perfmatters.js and google analytics script:
    - added the async attribute so that the script is executed asynchronously as soon as it is available.
4. Minify js perfmatters.js with Gulp using gulp-uglify
5. Minify css files with Gulp using gulp-minify-css

#### Results
1. PageSpeed Insights:
    - Mobile: 95/100
    - Desktop: 96/100


***


## Cam's Pizzeria
1. Launch the URL for [Cam's Pizzeria](http://nickhstr.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.html)
2. Open Dev Tools
3. Move the slider to change the pizza size - Check the console for time to change
4. Scrolling the page - The console should show average time to generate the last ten frames in milliseconds

#### Changing Pizza Sizes
1. Removed "determineDx" function 
2. Placed switch statements for sizes within "changePizzasSizes"
3. Created, and placed, "randomPizzas" variable outside of loop to save lookup time

##### Original:
    function determineDx (elem, size) {
    var oldWidth = elem.offsetWidth;
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldSize = oldWidth / windowWidth;

    // Optional TODO: change to 3 sizes? no more xl?
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newSize = sizeSwitcher(size);
    var dx = (newSize - oldSize) * windowWidth;

    return dx;
    }

    // Iterates through pizza elements on the page and changes their widths
    function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
    }
##### Modified:
    function changePizzaSizes(size) {
      switch(size) {
        case "1":
          newWidth = 25;
          break;
        case "2":
          newWidth = 33.3;
          break;
        case "3":
          newWidth = 50;
          break;
        default:
          console.log("bug in sizeSwitcher");
      }

      var randomPizzas = document.querySelectorAll(".randomPizzaContainer");

      for (var i = 0; i < randomPizzas.length; i++) {
      randomPizzas[i].style.width = newWidth + "%";
      }
    }

#### Sliding Pizza Generator
1. Modified the for loop to be more efficient.
2. Reduced number of sliding pizzas generated from 200 to 30. You only need 30 to populate the page.
3. Removed the width and height style to eliminate the process of resizing (the width and height are set in style.css)

##### Original:
      document.addEventListener('DOMContentLoaded', function() {
        var cols = 8;
        var s = 256;
        for (var i = 0; i < 200; i++) {
          var elem = document.createElement('img');
          elem.className = 'mover';
          elem.src = "images/pizza.png";
          elem.style.height = "100px";
          elem.style.width = "73px";
          elem.basicLeft = (i % cols) * s;
          elem.style.top = (Math.floor(i / cols) * s) + 'px';
          document.querySelector("#movingPizzas1").appendChild(elem);
        }
        updatePositions();
      });

##### Modified:
    document.addEventListener('DOMContentLoaded', function() {
      var cols = 8;
      var s = 256;
      for (var i = 0; i <= 30; i++) {
        var elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        document.querySelector("#movingPizzas1").appendChild(elem);
      }
      updatePositions();
    });

#### updatePositions
Added savedScrollTop and placed it outside the for loop.

##### Original:
    function updatePositions() {
      frame++;
      window.performance.mark("mark_start_frame");

      var items = document.querySelectorAll('.mover');
      for (var i = 0; i < items.length; i++) {
        var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
            items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
      }

##### Modified:
    function updatePositions() {
      frame++;
      window.performance.mark("mark_start_frame");
      var items = document.querySelectorAll('.mover');
      var savedScrollTop = document.body.scrollTop;
      for (var i = 0; i < items.length; i++) {
        var phase = Math.sin((savedScrollTop / 1250) + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
      }

### Results
1. Page Speed over 60 fps during scrolling (via console)
2. Time to resize under 1 ms

### References
1. https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

### Build Tools
#### Gulp
1. In order to use Gulp.js, node.js and npm must be installed
2. After those two are installed, you must install Gulp globally
3. Next, navigate to the project directory and install Gulp, as well as the necessary plugins
  * Plugins used in this project:
    1. gulp-uglify
    2. gulp-minify-css
    3. gulp-rename
    4. gulp-imagemin
4. Now, create gulp tasks (see gulpfile.js below)
5. Type "gulp" in the terminal, and let Gulp take care of the rest! (Note: I left the "images" task unwatched; no need to recompress images constantly)

##### gulpfile.js:

    var gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      minifyCSS = require('gulp-minify-css'),
      imagemin = require('gulp-imagemin');

    gulp.task('scriptMain', function() {
      gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename('perfmatters.min.js'))
    .pipe(gulp.dest('js'));
    });

    gulp.task('scriptViews', function() {
      gulp.src('views/js/*.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('views/js'));
    });

    gulp.task('stylesMain', function() {
      gulp.src('css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/minCSS'));
    });

    gulp.task('stylesViews', function() {
      gulp.src('views/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('views/css/minCSS'));
    });

    gulp.task('images', function() {
      gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img'));
      gulp.src('views/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('views/images'));
    });

    gulp.task('watch', function() {
      gulp.watch('js/*.js', ['scriptMain']);
      gulp.watch('views/js/*.js', ['scriptViews']);
      gulp.watch('css/*.css', ['stylesMain']);
      gulp.watch('views/css/*.css', ['stylesViews']);
    });

    gulp.task('default', ['scriptMain', 'scriptViews', 'stylesMain', 'stylesViews', 'watch']);