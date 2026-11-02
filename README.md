# David & Sukirtharani — Wedding Invitation

A mobile-friendly, buildless static wedding invitation.

## Preview locally

Open `index.html` directly in a browser, or serve this folder with any simple static server. For example:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

Upload this entire folder without changing its structure. The site requires no package installation, framework, database, or build command.

- **Netlify:** drag the folder into Netlify Drop, or use it as the publish directory.
- **GitHub Pages:** commit the files to the publishing branch and serve from the repository root.
- **cPanel / shared hosting:** upload `index.html`, `assets/`, and their contents to `public_html`.

`index.html` is the entry page. The Google Fonts request is optional; system fallbacks keep the invitation readable if it is blocked or unavailable.

## Files

- `index.html` — accessible invitation markup
- `assets/styles.css` — responsive presentation and envelope animation
- `assets/script.js` — interaction and India-time countdown
- `assets/david-sukirtharani.jpg` — optimized portrait asset

The original `INVITE  CODE.txt` is retained unchanged as a reference.
