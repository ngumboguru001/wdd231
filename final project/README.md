# AutoHub — WDD 231 Final Project

AutoHub is an informational website about global vehicle brands, popular models and spare parts. It demonstrates responsive design, accessible navigation, JSON data rendering, filtering, modal dialogs, local storage, GET forms, `URLSearchParams`, array methods, template literals, asynchronous operations and ES modules.

## Included pages
- `index.html` — home, maintenance checklist dialog, local-storage visit count.
- `catalog.html` — dynamically loads the JSON directory, search/type/category filters, detail dialog.
- `contact.html` — accessible GET form.
- `success.html` — reads and displays form values with `URLSearchParams`.
- `attributions.html` — project purpose and data disclaimer.
- `css/styles.css` — responsive styling.
- `js/` — JavaScript ES modules.
- `data/catalog.json` — 25 illustrative entries, each with multiple properties.

## Run locally
Because the catalog uses `fetch()`, do not open `catalog.html` directly as a `file://` URL. Use a local web server:
1. Extract this ZIP.
2. Open the `autohub_wdd231` folder in VS Code.
3. Install/use the Live Server extension.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Open `Vehicles & Parts`, search/filter entries, open a detail modal, and test the contact form.

A simple Python server also works if Python is installed:
```bash
python -m http.server 5500
```
Then visit `http://localhost:5500`.

## Rubric evidence checklist
- [ ] All published pages load without console errors.
- [ ] Lighthouse Accessibility, Best Practices, and SEO are each 95+ in mobile mode on all required pages.
- [ ] No WCAG AA contrast errors in the required checker.
- [ ] Responsive layout checked at mobile, tablet, and desktop widths.
- [ ] Hamburger navigation works on mobile and flex navigation works on desktop.
- [ ] JSON dataset has 15+ items, each with at least four meaningful properties.
- [ ] Search and filters work; item cards are rendered dynamically.
- [ ] Modal dialog opens and closes accessibly.
- [ ] Visit count persists using local storage.
- [ ] GET form submits and `success.html` reads query parameters.
- [ ] Demonstration video is recorded and linked.
- [ ] GitHub Pages deployment is tested after publication.

## External fonts
The stylesheet imports DM Sans and Manrope from Google Fonts. A system sans-serif fallback is included if the external font service is unavailable.
