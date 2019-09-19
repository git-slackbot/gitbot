const express = require('express');
const bodyParser = require('body-parser');
const perform = require('./lib/perform');
const app = express();
const jsonParser = bodyParser.json();
app.get('/status', jsonParser, function (req, res) {
   res.json({ "status": "ok" });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/setup', jsonParser, function (req, res) {
  console.log('header ', req.headers);
  let message = {
      response_type: 'in_channel'
  };

  // invalid arguments
  const args = req.headers.text.split(' ');
  if (args.length !== 1) {
      message.text = 'invalid arguments';
      return res.json(message);
  }

  const userId = req.headers.user_id;
  const token = args[0];

  (async () => {
      try {
          let response = await setup(userId, token);
          const message = {
              response_type: 'in_channel',
              text: `sucessfully setup`,
          };

          return res.json(message);
      } catch (e) {
          message.text = `failed with error ${e}`;

          return res.json(message);
      }
  })();
})

app.post('/approve', jsonParser, function (req, res) {
  console.log('body ', req.headers);
  const body = req.headers.text ? req.headers.text : '';
  const args = query.split(' ');
  let message = {
      response_type: 'in_channel'
  };

  // invalid arguments
  if (queries.length !== 3) {
      message.text = 'invalid arguments';
  }

  const [owner, repo, prNumber] = args;

  (async () => {
      try {
        let response = await perform(owner, repo, prNumber, 'APPROVE');
        const message = {
            response_type: 'in_channel',
            text: `sucessfully approved ${owner}/${repo}/${prNumber}`,
        };

        res.json(message);
      } catch (e) {
          // Deal with the fact the chain failed
      }
  })();
})

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
});

const port = process.env.PORT || 9999;
app.listen(port);
console.log('Express Server - listening on port: ' + port);

// const fs = require('fs');
// const http = require('http');
// const https = require('https');
// const privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
// const certificate  = fs.readFileSync('ssl/server.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
// // httpServer.listen(4080);
// httpsServer.listen(port);
// console.log('Express Server - listening on port: ' + port);
