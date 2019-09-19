const request = require('request');
const { promisify } = require('util');
const rp = promisify(request);
const host = 'https://api.github.com';
const tokenMap = {};

async function setup(userId, token) {
  tokenMap[userId] = token;
  console.log('-------------------map', tokenMap);
}

async function perform(owner, repo, prNumber, action, userId) {
  if (action === 'APPROVE') {
    console.log('-------------------', userId);
    console.log('-------------------map', tokenMap);
    const method = 'POST';
    const relativePath = `/repos/${owner}/${repo}/pulls/${prNumber}/reviews`;
    const uri = `${host}${relativePath}`;
    const headers = {
      'Authorization': `token ${tokenMap[userId]}`,
      'User-Agent': 'git-slackbot'
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

module.exports = {
  perform,
  setup
}
