# Doc Vault + OneMealForward website

Responsive static campaign site with an optional, voluntary self-reported participation counter. Ordinary page visits only read the count; they never increment it.

## Shared counter

The site uses [Count API](https://countapi.mileshilliard.com/), a free hosted counter with no account or API key. It reads the public named counter `onemealforward_contributions` with `GET /api/v1/get/{key}` and increments it with `GET /api/v1/hit/{key}` only after a visitor checks the voluntary confirmation and submits. If the service reports that the key does not exist, the page displays zero; no count is seeded or incremented on page load.

The counter is public and anyone who knows its name can read or increment it. The service documents rate limiting, but the site cannot reliably prevent duplicate clicks, retries after an ambiguous network failure, or deliberate abuse. Counts are self-reported acknowledgements, not verified meals. The service may process normal request metadata. No name, contact details, meal details, proof, or Doc Vault data is sent.

## Campaign artwork and card actions

`assets/onemealforward-campaign.png` is cropped from the existing `Doc Vault & OneMealForward Brand Showcase.png`; the showcase itself is preserved. Share uses the image file where Web Share supports file sharing and downloads the same image as a fallback. Download saves only that image. Print uses a print stylesheet that displays only the image.

## Local preview

Open `index.html` for a quick preview. For browser APIs, serve this directory from localhost, for example `python -m http.server 8000`, and open `http://localhost:8000`.

## Publish with GitHub Pages

1. Upload the contents of this directory (`index.html`, `styles.css`, `script.js`, and `assets/`) to the campaign repository root.
2. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
3. After GitHub shows the published URL, open `<published-url>/#kindness` and verify HTTPS works.
4. Set `ONE_MEAL_FORWARD_URL` in Doc Vault's `app.js` to that campaign URL ending in `#kindness`, then rebuild the web assets and Android debug app if distributing it.

No SQL, database project, credentials, account setup, push, or deployment is required by this local implementation. The Google Play link remains a placeholder until the app is published. The site's QR placeholder remains intentionally unpopulated.
