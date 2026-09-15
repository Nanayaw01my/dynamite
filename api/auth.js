/* Step 1 of the admin login: send the editor to GitHub to approve access.
   Pairs with api/callback.js. Requires the GITHUB_CLIENT_ID environment
   variable (set in the Vercel dashboard). */

const crypto = require('crypto');

module.exports = function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('GITHUB_CLIENT_ID is not set. Add it in the Vercel project settings.');
    return;
  }

  // Random value echoed back by GitHub, so we can tell a real reply from a forged one.
  const state = crypto.randomBytes(16).toString('hex');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';

  res.setHeader('Set-Cookie', [
    `cms_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  ]);

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', `${proto}://${host}/api/callback`);
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);

  res.writeHead(302, { Location: url.toString() });
  res.end();
};
