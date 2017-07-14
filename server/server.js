// import modules
const restify = require('restify');
const fs = require('fs');
// const router = require('./router.js');

/**
 * @name serveStatic
 * @description serves the requested static resource
 * @param {Request} req - an http request
 * @param {Response} res - an http response
 */
function serveStatic(req, res) {
  const contentType = req.headers.accept.split(',')[0];
  const path = req.path();
  let filePath = '/app/index.html';
  console.log('GETTING: ' + path);

  if (path !== '/') filePath = path;

  fs.readFile( '.' + filePath, function (error, data) {
    if (data) {
      res.writeHead(200, {
        'Content-Type': contentType, 'Content-Length': data.length
      });
      res.write(data);
      res.send();
    } else if (error) {
      res.send(error); // does this even work
    }
  });
}

function getData(req, res) {
  const client = restify.createClient({
    url: 'https://api.rivet.works'
  });

  const outerRes = res; // TODO: better name for this

  client.get('/embedded/widget/letuscorporation-grid', (err, req) => {
    if (err) {
      console.log(err);
      return;
    }

    req.on('result', (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      res.body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        res.body += chunk;
      });

      res.on('end', () => {
        console.log(JSON.parse(res.body));
        // outerRes.write(res.body);
        outerRes.send(JSON.parse(res.body));
      });
    });
  });
}

// declare initial variables
const server = new restify.createServer();

// set up middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());
// server.use(restify.CORS());
server.get({ name: 'getData', path: 'get-data' }, getData);
server.get({ name: 'root', path: /.*/ }, serveStatic);


// start up server
server.listen(9000, () => {
  console.log('listening on port 9000');
});

// export server reference for testing
module.exports = server;
