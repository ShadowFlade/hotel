function importAll(resolve) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../src/pug/layout', true, /\.js$|/));
importAll(require.context('../src/pug/components', true, /\.js$|/));
importAll(require.context('../src/pug/pages', true, /\.js$|/));
