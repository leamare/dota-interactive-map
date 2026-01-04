require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const sass = require('sass');
const CleanCSS = require('clean-css');
const git = require('git-rev-sync');
const fs = require('fs');

try {
    const result = sass.compile('src/scss/app.scss');
    console.log('Css compiled.');
    let contents = result.css.toString();
    let outFile = 'build/app.css';
    fs.writeFileSync(outFile, contents, 'utf8');
    console.log(`${outFile} was successfully saved.`);
    
    if (process.env.NODE_ENV === 'production') {
        const minified = new CleanCSS({ rebase: false }).minify(contents).styles;
        outFile = `build/app-${git.short()}.min.css`;
        fs.writeFileSync(outFile, minified);
        console.log(`${outFile} was successfully saved.`);
    }
} catch (err) {
    console.error('Sass compilation error:', err);
    process.exit(1);
}