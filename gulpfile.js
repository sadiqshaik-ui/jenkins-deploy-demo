// gulpfile.js
const { src, dest, series } = require('gulp');

// Example task: copy all JS files from src to dist
function copyJs() {
  return src('src/**/*.js')
    .pipe(dest('dist/'));
}

// Default task
exports.default = series(copyJs);
