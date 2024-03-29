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

- `src/layout` - put custom layout for pages
- `src/components` - all app includes
- `src/pages` - put custom app pages. Don't forget to import them in `index.js`
- `src/index.js` - main app file where you include/import all required libs and init app
- `src/static/` - folder with extra static assets that will be copied into output folder
- `src/font` - put your fonts here. Don't forget to use them in `src/common/fonts.scss`

## Dependencies:

```
    "chart.js": "^2.9.4",
    "material-design-icons": "^3.0.1",
    "moment": "^2.29.1"
    "air-datepicker": "^3.1.0",
```

P.S.: Also used [jquery plugin](https://api.jqueryui.com/slider/):
