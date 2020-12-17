'use strict';

const express = require('express');
const fs = require('fs');
const df = require('df');

fs.readdir('/mnt/workspace', (err, files) => {
  console.log(files)
});

df(function (err, table) {
  if (err) {
    console.error(err.stack);
    return;
  }

  console.log(JSON.stringify(table, null, '  '));
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// HTTP function invocation
const app = express();
app.get('/*', (req, res) => {
  res.send('Hello FunctionCompute, http function\n');
});

// Event function invocation
app.post('/invoke', (req, res) => {
	console.log(req)
  res.send('Hello FunctionCompute, event function\n');
});

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout

