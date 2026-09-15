# Dynamite Faith Church International — Website

A fast, responsive, dependency-free website for **Dynamite Faith Church International**,
Atebubu, Bono East Region, Ghana.

- White background, navy (`#12355B`) and gold (`#D4A72C`) brand palette
- Mobile-first, works from 320px up
- No build step, no frameworks, no npm install — plain HTML, CSS and JavaScript

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publishing as a Claude Artifact

`artifact/index.html` is a generated copy of the page for publishing as a shareable
Artifact (the Artifact host supplies its own `<head>`/`<body>`, so the wrappers are
stripped). Rebuild it after editing the site:

```bash
node build-artifact.js
```

Never edit `artifact/index.html` by hand — it is overwritten on every build.

## Deploying

Upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, cPanel).
There is nothing to compile.

## Editing the content

**Everything on the page is generated from one file: [`assets/js/content.js`](assets/js/content.js).**
Open it in any text editor and change the text between the quotes.

| What you want to change | Where |
| --- | --- |
| Church name, location, phone numbers, email | `church` |
| Who We Are / Mission / Vision / Values | `about` |
| Service names and times | `services` |
| Ministries | `ministries` |
| Sermons (title, speaker, date, video link) | `sermons` |
| Upcoming events | `events` |
| Gallery photos and captions | `gallery` |
| Facebook / YouTube / Instagram / TikTok links | `socials` |

Items marked `placeholder: true` are **sample content**. Replace the text with real
information and change it to `placeholder: false` so the "sample content" notice stops
showing.

### Common updates

**Add service times** — in `services`, set `day` and `time`:

```js
{ icon: 'sun', title: 'Sunday Worship', day: 'Sunday', time: '9:00 AM', ... placeholder: false }
```

**Add a sermon recording** — put the YouTube (or audio) link in `url`; the
"Watch / Listen" button then links straight to it.

**Add an event date** — use `YYYY-MM-DD`, e.g. `date: '2026-04-05'`. The date block on
the card fills in automatically.

**Add real photos** — drop the image files into `assets/img/` and point the gallery
`src` values at them, e.g. `src: 'assets/img/worship-2026.jpg'`. Always write a short,
accurate `alt` description for accessibility.

**Show the embedded map** — the map is a designed location panel by default, because
embedded Google Maps are blocked in many previews and sandboxes and leave an empty grey
box. Once the site is on the church's own domain, set `mapEmbed: true` in `church` to show
the real embedded map. The "Open in Google Maps" link works either way.

**Add the church email** — set `email: 'info@example.org'` in `church`. The footer and
contact section pick it up automatically.

**Add social media** — paste the real page URLs into `socials`. Links left empty render
as inactive placeholders rather than pointing anywhere false.

## Contact form

The form validates in the browser but **does not send email yet** — there is no backend.
Until one is connected it tells the visitor to call the church directly. To make it send,
point the `<form>` at a form service (Formspree, Netlify Forms, Web3Forms) or your own
endpoint in `index.html`.

## What is still placeholder

Nothing about the church was invented. The following are clearly marked and waiting for
real information: pastor names, church history, founding year, service times, event dates,
sermon recordings and speakers, the exact street address, the email address, social media
accounts, and the gallery photographs (currently locally-drawn SVG artwork, not stock
photos).

## Project structure

```
index.html            the page (semantic HTML, SEO + Open Graph tags, JSON-LD)
assets/css/styles.css design system (colour tokens, components, responsive rules)
assets/js/content.js  ← ALL EDITABLE CONTENT LIVES HERE
assets/js/main.js     rendering, navigation, lightbox, form validation
assets/img/           SVG artwork and favicon
```

## Accessibility

Skip link, keyboard-operable menu and lightbox (Escape / arrow keys), visible focus rings,
`aria-current` on the active nav item, labelled form fields with inline error messages,
alt text on every image, and reduced-motion support.
