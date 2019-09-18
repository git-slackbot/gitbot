const request = require('request');
const { promisify } = require('util');
const rp = promisify(request);
const host = 'https://api.github.com';
const tokenMap = {};

async function setup(userId, token) {
  tokenMap[userId] = token;
}

async function perform(owner, repo, prNumber, action) {
  if (action === 'APPROVE') {
    const method = 'POST';
    const relativePath = `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`;
    const uri = `${host}${relativePath}`;
    const headers = {
      'Authorization': `token ${tokenMap[userId]}`
    };
    const body = {
       'event': action.toUpperCase()
    }
    const options = {
      uri,
      method,
      headers,
      body,
      json: true
    };

    return rp(options);
  }

  // other actions
}

module.exports = perform;
