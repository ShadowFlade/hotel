## Build Setup:

```bash
# Download repository:
git clone https://github.com/ShadowFlade/metalamp.git

#Deployed on GH Pages
https://shadowflade.github.io/metalamp/

# Go to the app:
cd metalamp

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8081/
npm run dev

# Output will be at dist/ folder
npm run build
## Project Structure:

- `src/pug/layout` - put custom layout for pages
- `src/pug/includes` - all app includes
- `src/pug/pages` - put custom app pages. Don't forget to import them in `index.js`
- `src/assets/img` - put images here. Don't forget to use correct path: `assets/img/some.jpg`
- `src/js` - put custom app scripts here
- `src/index.js` - main app file where you include/import all required libs and init app
- `static/` - folder with extra static assets that will be copied into output folder


SCSS
// Example with Helvetica
@font-face {
  font-family: 'Helvetica-Base';
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot'); /* IE9 Compat Modes */
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */ url('/assets/fonts/Helvetica/Base/Helvetica-Base.woff') format('woff'),
    /* Pretty Modern Browsers */
      url('/assets/fonts/Helvetica/Base/Helvetica-Base.ttf') format('truetype'),
    /* Safari, Android, iOS */
      url('/assets/fonts/Helvetica/Base/Helvetica-Base.svg') format('svg'); /* Legacy iOS */
}
```
