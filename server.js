const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const logFilePath = path.join(__dirname, 'server-logs.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const log = (message) => {
  const timestamp = new Date().toISOString();
  logStream.write(`[${timestamp}] ${message}\n`);
};

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      const errorMessage = `Error occurred handling ${req.url}: ${err.message}`;
      console.error(errorMessage);
      log(errorMessage);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      const errorMessage = `Server error: ${err.message}`;
      console.error(errorMessage);
      log(errorMessage);
      process.exit(1);
    })
    .listen(port, () => {
      const startMessage = `> Ready on http://${hostname}:${port}`;
      console.log(startMessage);
      log(startMessage);
    });
});
