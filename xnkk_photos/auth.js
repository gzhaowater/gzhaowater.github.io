/* ==========================================================================
 * XNKK Photos — authentication
 * -------------------------------------------------------------------------- *
 *  Two modes, chosen automatically:
 *
 *  1. SERVER mode (preferred, post-deploy)
 *     If `window.XNKK_API_BASE` is set before this script loads, login() does
 *     a POST to `${XNKK_API_BASE}/login` with JSON body
 *         { "user": "...", "pass": "..." }
 *     credentials: 'include' so cookies (httpOnly session) flow through.
 *     The server returns { token, expiresAt } and we store the token in
 *     sessionStorage. The server is the source of truth.
 *
 *  2. PLACEHOLDER mode (default while the office server is being prepared)
 *     The credentials are checked client-side against a SHA-256 hash baked
 *     into CONFIG below. This is NOT secure — anyone with the page can read
 *     the hash and bypass the gate. Use it only until the server endpoint
 *     is live, then set window.XNKK_API_BASE and this file switches modes.
 *
 *  To rotate the placeholder credentials:
 *     echo -n 'NEW_PASSWORD' | sha256sum
 *     replace CONFIG.PASSWORD_HASH below with the new digest.
 *
 *  To switch to server mode, add this BEFORE the <script src="auth.js">:
 *     <script>window.XNKK_API_BASE = 'https://photos.office.example';</script>
 * ========================================================================== */

(function () {
  'use strict';

  // ---- CONFIG (edit only this object to rotate placeholder credentials) ----
  const CONFIG = {
    EXPECTED_USER: 'xnkk',
    PASSWORD_HASH: 'e54ae8ed7411c44188f147fa3e7ce3009bab332ac388fc0509bb39fcf86e6174', // sha256('changeMe123')
    SESSION_TTL_MS: 12 * 60 * 60 * 1000,   // 12h
    SESSION_KEY:    'xnkk.session.v1',
  };

  // ---- SESSION helpers ------------------------------------------------------
  function readSession() {
    try {
      const raw = sessionStorage.getItem(CONFIG.SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.user || !s.expiresAt || Date.now() > s.expiresAt) {
        sessionStorage.removeItem(CONFIG.SESSION_KEY);
        return null;
      }
      return s;
    } catch (_) {
      return null;
    }
  }

  function writeSession(session) {
    sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(session));
  }

  function clearSession() {
    sessionStorage.removeItem(CONFIG.SESSION_KEY);
  }

  function isAuthenticated() {
    return readSession() !== null;
  }

  function requireAuth(redirectTo) {
    if (!isAuthenticated()) {
      const next = encodeURIComponent(redirectTo || window.location.pathname);
      window.location.replace(`./?next=${next}`);
    }
  }

  // ---- HASH helper (SHA-256, via Web Crypto) -------------------------------
  async function sha256Hex(text) {
    const buf = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ---- LOGIN ---------------------------------------------------------------
  // Returns { ok: true, session } or { ok: false, error }.
  async function login(user, pass) {
    user = (user || '').trim();
    pass = pass || '';
    if (!user || !pass) {
      return { ok: false, error: 'Username and password are required.' };
    }

    const apiBase = window.XNKK_API_BASE;
    if (apiBase) {
      // ---- SERVER mode ----
      try {
        const res = await fetch(`${apiBase.replace(/\/$/, '')}/login`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',          // session cookie from server
          body: JSON.stringify({ user, pass }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          return { ok: false, error: body.error || `Login failed (HTTP ${res.status}).` };
        }
        const data = await res.json();    // { token, expiresAt, user }
        const session = {
          user:       data.user || user,
          token:      data.token,
          expiresAt:  data.expiresAt || (Date.now() + CONFIG.SESSION_TTL_MS),
          mode:       'server',
        };
        writeSession(session);
        return { ok: true, session };
      } catch (err) {
        return { ok: false, error: `Cannot reach auth server: ${err.message}` };
      }
    }

    // ---- PLACEHOLDER mode ----
    if (user !== CONFIG.EXPECTED_USER) {
      // still hash, to keep timing roughly constant
      await sha256Hex(pass);
      return { ok: false, error: 'Invalid username or password.' };
    }
    const candidate = await sha256Hex(pass);
    if (candidate !== CONFIG.PASSWORD_HASH) {
      return { ok: false, error: 'Invalid username or password.' };
    }
    const session = {
      user,
      token:    candidate.slice(0, 16),    // placeholder token (NOT a credential)
      expiresAt: Date.now() + CONFIG.SESSION_TTL_MS,
      mode:     'placeholder',
    };
    writeSession(session);
    return { ok: true, session };
  }

  function logout() {
    const apiBase = window.XNKK_API_BASE;
    if (apiBase) {
      // best-effort server-side logout; ignore failures
      fetch(`${apiBase.replace(/\/$/, '')}/logout`, {
        method: 'POST', credentials: 'include',
      }).catch(() => {});
    }
    clearSession();
    window.location.replace('./');
  }

  // ---- public API ----------------------------------------------------------
  window.XNKK_AUTH = {
    CONFIG,
    login,
    logout,
    isAuthenticated,
    requireAuth,
    sha256Hex,
    getSession: readSession,
  };
})();
