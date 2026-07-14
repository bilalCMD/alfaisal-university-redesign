const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 8834;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (!err) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      return res.end(data);
    }
    // Clean-URL fallback (mirrors Vercel's cleanUrls): /about -> about.html
    const htmlPath = filePath + '.html';
    fs.readFile(htmlPath, (err2, data2) => {
      if (err2) { res.writeHead(404); return res.end('Not found: ' + urlPath); }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data2);
    });
  });
}).listen(port, () => console.log('Serving ' + root + ' at http://localhost:' + port));
