
const cfg = require("./config");
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors');
var serveIndex = require('serve-index');


const app = express();

app.use(cors());
express.static('assets');
app.use('/assets', express.static('assets'), serveIndex('assets', {'icons': true}));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


if (cfg.production) {
  app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

/**
 * Get port from environment and store in Express.
 */
const port = '9000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
