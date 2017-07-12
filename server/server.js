// import modules
const restify = require('restify');
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
      res.send(error);
    }
  });
}

// declare initial variables
const server = new restify.createServer();

// set up middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());
// server.use(restify.CORS());
server.get({ name: 'root', path: /.*/ }, serveStatic);


// start up server
server.listen(9000, () => {
  console.log('listening on port 9000');
});

// export server reference for testing
module.exports = server;
