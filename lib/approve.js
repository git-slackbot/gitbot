const request = require('request');
const { promisify } = require('util');
const rp = promisify(request);

const host = 'https://api.github.com';

async function approve(accessToken, owner, repo, prNumber, action) {
  const method = 'POST';

  const relativePath = `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`;
  const uri = `${host}${relativePath}`;

  console.log('relativePath', relativePath);
  const headers = {
    'Authorization': `token ${accessToken}`
  };
  const body = {
	   'event': action.toUpperCase()
  }

  console.log('uri', uri);
  const options = {
    uri,
    method,
    headers,
    body,
    json: true
  };

  // return Promise.resolve();
  return rp(options);
}

module.exports = approve;
