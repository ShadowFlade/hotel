// JS
import './js/'
// SCSS
import './assets/scss/main.scss'
import './assets/scss/utils/default-input.scss'
function importAll(resolve) {
  resolve.keys().forEach(resolve)
}

importAll(require.context('../src/', true, /\.js$|\.scss$/))
