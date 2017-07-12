const fs = require('fs');

/**
 * @name serveStatic
 * @description serves the requested static resource
 * @param req
 * @param res
 */
function serveStatic(req, res) {
  const contentType = req.headers.accept.split(',')[0];
  const path = req.path();
  let filePath = '/app/index.html';
  console.log('GETTING: ' + path)

  if (path !== '/') filePath = path;

  fs.readFile( '.' + filePath, function (error, data) {
    if (data) {
      res.writeHead(200, {'Content-Type': contentType, 'Content-Length':data.length});
      res.write(data);
      res.send();
    } else if (error) {
      res.send(error);
    }
  });
}

/**
 * @name setUpAPIRoutes
 * @description creates the functions that will carry out actions for API calls
 * @param server
 * @param client - object for database interaction
 */
function setUpAPIRoutes(server, client) {
  console.log('Setting up API routes');
  server.post({ name: 'createMovie', path: '/api/movies'}, createMovie(client));
  server.get({ name: 'getMovie', path: '/api/movies'}, getMovies(client));
  server.put({ name: 'putMovie', path: '/api/movies'}, updateMovie(client));
  server.del({ name: 'delMovie', path: '/api/movies'}, deleteMovie(client));
}

/**
 * @name createMovie
 * @description creates a record of a movie in psql db, responds with db output
 */
function createMovie(client) {
  return function (req, res) {
    const movieParams = req.body;
    const movieValues = [
      movieParams.genre,
      movieParams.actors,
      movieParams.title,
      movieParams.year || null,
      movieParams.rating
    ];

    const sqlString = `
      INSERT INTO movies (genre, actors, title, year, rating)
      VALUES ($1, $2, $3, $4, $5);
    `;

    client.query(sqlString, movieValues, _dbCallback(req, res));
  };
}

/**
 * @name getMovies
 * @description grabs all the movies in the movies table. responds with array of
 *  objects
 */
function getMovies(client) {
  return function (req, res) {
    const query = req.query;
    const sqlString = `
      SELECT * FROM movies;
    `
    client.query(sqlString, [], _dbCallback(req, res));
  }
}

// NOTE: not being used and not finished.
function updateMovie(client) {
  return function (req, res) {
    console.log('UPDATING A MOVIE');
    const movieParams = req.body
    const movieValues = [
      movieParams.title,
      movieParams.year,
      movieParams.genre,
      movieParams.rating,
      movieParams.actors
    ];
    console.log(movieValues)
    const sqlString = `
      UPDATE movies
      SET year=$2, genre=$3, rating=$4, actors=$5
      WHERE title = $1;
    `;

    client.query(sqlString, movieValues, _dbCallback(req, res));
  };
}

/**
 * @name deleteMovie
 * @description takes in a title and removes the movie with that title from the
 *  databaseS
 */
function deleteMovie(client) {
  return function (req, res) {
    const title = [ req.query.title ];
    const sqlString = `
      DELETE FROM movies WHERE title = $1;
    `;

    client.query(sqlString, title, _dbCallback(req, res));
  }
}

/**
 * @name _dbCallback
 * @description generic callback to handle result of tyring to write to psql
 */
function _dbCallback(req, res) {
  return function (err, result) {
    if (err) {
      console.log('SOMETHING WENT WRONG WRITING TO DB')
      res.writeHead(500, {'Content-Type': 'application/json'})
      return res.end(JSON.stringify({error: { message: 'something went wrong writing to the database', error: err } }));
    }
    console.log(result)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({ data: result.rows }));
  };
}

module.exports = {
  serveStatic: serveStatic,
  setUpAPIRoutes: setUpAPIRoutes
}
