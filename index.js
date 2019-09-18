const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// create application/json parser
const jsonParser = bodyParser.json();
app.get('/status', jsonParser, function (req, res) {
   res.json({ "status": "ok" });
});

app.post('/api/approve', jsonParser, function (req, res) {
  console.log(req.body);

  let gitAccessToken = '',
      owner = '',
      repo = '',
      prNumber = 1,
      action = 'APPROVE';

  const message = {
      response_type: 'in_channel',
      text: 'places[0].name',
  };
  res.json(message);

  // res.json(req.body);
  // (async () => {
  //     try {
  //       let x = await approve(gitAccessToken, owner, repo, prNumber, action);
  //       res.json(req.body);
  //     } catch (e) {
  //         // Deal with the fact the chain failed
  //     }
  // })();
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
