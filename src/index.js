// JS
// import './js/'
// SCSS
// import './assets/scss/main.scss'
// import './assets/scss/utils/default-input.scss'
function importAll(resolve) {
  resolve.keys().forEach(resolve)
}
importAll(require.context('../src/pug/layout', true, /\.js$|/))
importAll(require.context('../src/pug/includes/modules', true, /\.js$|/))
importAll(require.context('../src/pug/pages', true, /\.js$|/))
