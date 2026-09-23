# XNKK Photos — auth notes

Static page hosted on GitHub Pages. Today it runs in **placeholder mode**
(client-side hash check); switch it to **server mode** once the office
authentication service is reachable.

## Files

| File | Purpose |
| ---- | ------- |
| `index.html`   | Login form. Also redirects signed-in users straight to `gallery.html`. |
| `gallery.html` | Protected landing page; calls `XNKK_AUTH.requireAuth()` on load. |
| `auth.js`      | Shared auth logic (login / logout / session). One config block on top. |

## Placeholder credentials (default)

- user: `xnkk`
- pass: `changeMe123`

To rotate:

```sh
printf '%s' 'NEW_PASSWORD' | sha256sum
```

…and paste the digest into `CONFIG.PASSWORD_HASH` inside `auth.js`.

> ⚠️ Placeholder mode is **not** secure. Anyone can read the hash and
> bypass the gate from devtools. Move to server mode as soon as possible.

## Switching to server mode

The office auth service is expected to expose two endpoints:

```
POST /login    body: { "user": "...", "pass": "..." }
               → 200 { "user": "...", "token": "...", "expiresAt": <epoch_ms> }
               → 401 { "error": "..." }
POST /logout   → 204  (clears the httpOnly session cookie)
GET  /photos   → 200 [ ...thumbnails... ]   (gated by the session cookie)
```

Wire it up by setting one global **before** `auth.js` loads:

```html
<script>
  window.XNKK_API_BASE = 'https://photos.office.example';
</script>
<script src="./auth.js"></script>
```

`auth.js` switches to server mode automatically when that variable is set:

- `login()` does a `POST` to `${XNKK_API_BASE}/login` with `credentials: 'include'`,
  so the server's `httpOnly` session cookie flows through.
- The returned `token` and `expiresAt` are cached in `sessionStorage` for the
  in-page `gallery.html`. The server cookie is still authoritative — server mode
  means the server validates every request.
- `logout()` does a best-effort `POST ${XNKK_API_BASE}/logout` then clears local state.
- `gallery.html` uses the session cookie (via `credentials: 'include'`) when calling
  `${XNKK_API_BASE}/photos`. The Bearer token from login is included as a fallback
  header in case the server expects it instead.

## CORS

When the office auth server lives on a different origin than
`gzhaowater.github.io`, the server must respond to:

- `Access-Control-Allow-Origin: https://gzhaowater.github.io`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Access-Control-Allow-Methods: POST, GET, OPTIONS`

(for preflight on `POST /login` with `Content-Type: application/json`).
For a tighter setup, proxy the auth service through the same origin as the
site (e.g. via nginx in front of `gzhaowater.github.io`-style hosting).

## Session lifetime

`SESSION_TTL_MS` in `auth.js` controls how long a placeholder-mode session
lasts (12h default). In server mode this is whatever the office service
issues — set `expiresAt` in the response and `auth.js` will honor it.

## What lives where, after the cutover

| Today (placeholder)                          | After server is live                              |
| -------------------------------------------- | ------------------------------------------------- |
| `auth.js` checks hash in-page                 | `auth.js` POSTs to office server                  |
| Password hash baked into `auth.js`           | Hash never appears in source                      |
| Session in `sessionStorage`                  | Session in `httpOnly` cookie on office server     |
| Gallery just logs the response               | Gallery renders real thumbnails                   |
