/* Builds artifact/index.html — the same site, packaged for publishing as a
   Claude Artifact. The artifact host supplies <!doctype>, <head> and <body>,
   so this strips those wrappers and keeps the page content, stylesheet links
   and scripts. Run:  node build-artifact.js  */
const fs = require('fs');

const src = fs.readFileSync('index.html', 'utf8');

// The site's <title> carries the region for SEO; the artifact gallery wants a plain name.
const title = 'Dynamite Faith Church International';
const fontLink = src.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>/)[0];
const jsonLd = src.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/)[0];
const body = src.match(/<body>([\s\S]*)<\/body>/)[1].trim();

const out = `<title>${title}</title>
${fontLink}
<link rel="stylesheet" href="assets/css/styles.css">
${jsonLd}

${body}
`;

fs.mkdirSync('artifact', { recursive: true });
fs.writeFileSync('artifact/index.html', out);
console.log('artifact/index.html written —', out.length, 'bytes');
