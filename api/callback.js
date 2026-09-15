/* Step 2 of the admin login: GitHub sends the editor back here with a code,
   which is exchanged for an access token and handed to the CMS running in the
   window that opened this one.

   Requires GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (set in Vercel). */

module.exports = async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  function finish(status, payload) {
    // The CMS listens for this message from the popup it opened.
    const message = 'authorization:github:' + status + ':' + JSON.stringify(payload);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Set-Cookie', 'cms_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
    res.status(200).send(
      '<!DOCTYPE html><title>Signing in…</title><p>Signing you in…</p><script>(function () {\n' +
      '  var message = ' + JSON.stringify(message) + ';\n' +
      '  function send(e) { window.opener.postMessage(message, e.origin); }\n' +
      '  window.addEventListener("message", send, false);\n' +
      '  if (window.opener) window.opener.postMessage("authorizing:github", "*");\n' +
      '  else document.body.textContent = "Open the admin at /admin and sign in from there.";\n' +
      '})();</script>'
    );
  }

  if (!clientId || !clientSecret) {
    finish('error', { message: 'GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET are not set in Vercel.' });
    return;
  }

  const { code, state } = req.query || {};
  const cookie = req.headers.cookie || '';
  const expected = (cookie.match(/(?:^|;\s*)cms_oauth_state=([^;]+)/) || [])[1];

  if (!code) { finish('error', { message: 'GitHub did not send an authorization code.' }); return; }
  if (!state || !expected || state !== expected) {
    finish('error', { message: 'Login session expired or did not match. Please try signing in again.' });
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
    });
    const data = await response.json();

    if (data.error || !data.access_token) {
      finish('error', { message: data.error_description || 'GitHub refused the sign-in.' });
      return;
    }
    finish('success', { token: data.access_token, provider: 'github' });
  } catch (err) {
    finish('error', { message: 'Could not reach GitHub: ' + err.message });
  }
};
