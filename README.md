# Deployed on GH Pages

https://shadowflade.github.io/hotel/

## Build Setup:

```bash
# Download repository:
git clone https://github.com/ShadowFlade/hotel.git

# Go to the app:
cd hotel

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8081/
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

- `src/pug/layout` - put custom layout for pages
- `src/pug/includes` - all app includes
- `src/pug/pages` - put custom app pages. Don't forget to import them in `index.js`
- `src/assets/img` - put images here. Don't forget to use correct path: `assets/img/some.jpg`
- `src/js` - put custom app scripts here
- `src/index.js` - main app file where you include/import all required libs and init app
- `static/` - folder with extra static assets that will be copied into output folder

## Dependencies:

```
    "chart.js": "^2.9.4",
    "daterangepicker": "^3.1.0",
    "material-design-icons": "^3.0.1",
    "moment": "^2.29.1"
```
