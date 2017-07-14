const babel = require('babel-core');
const fs = require('fs');

/**
 * @name promisify
 * @description naive implementation of promisify. will turn any node async
 *  function into a function that returns a native Promise.
 * @param asyncFn
 * @return function
 */
function promisify(asyncFn) {
 return function promisified() {
   return new Promise((resolve, reject) => {
     const argCopy = _dupeArgs(arguments);

     // node async functions always take the callback last
     // callback is usually cb(err, res)
     argCopy.push(function conventionalCB(err, result) {
        if (err) return reject(err);
        return resolve(result);
      });

      return asyncFn.apply(this, argCopy);
   });
 };
}

/**
 * @name _dupeArgs
 * @description helper to map the arguments object to an array
 * @param args
 * @return Array
 */
function _dupeArgs(args) {
  return Object.keys(args).map( argKey => args[argKey] );
}

const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const transformFile = promisify(babel.transformFile);

/**
 * @name recursiveTransform
 * @description recursively calls itself looking for .jsx and .js files to convert
 *  them to es2015 and move them into the bundle
 * @param fileNames
 * @param dir
 * @return [ Promise ]
 */
function recursiveTransform(fileNames, dir) {
  const currDir = dir || __dirname + '/app';
  const promiseArray = [];
  console.log(currDir);
  console.log('fileNames', fileNames);
  fileNames.forEach(file => {
    const ext = file.split('.')[1];
    if (ext === 'jsx') {
      promiseArray.push(
        transformFile(currDir + '/' + file, {})
          .then(writeResultsToFile));
    } else if (ext === 'js') {
      readFile(currDir + '/' + file)
        .then(result => {
          writeFile('./bundle/' + file, result);
        })
    }
    if (ext === undefined) {
      promiseArray.push(readdir(currDir + '/' + file)
        .then( results => {
          return recursiveTransform(results, currDir + '/' + file);
        }));
    }
  })
  return Promise.all(promiseArray);
}

/**
 * @name writeResultsToFile
 * @description writes the transformed code returned by babel to a new file
 * @param result - the result of babel transform
 * @return Promise
 */
function writeResultsToFile(result) {
  if (!result) return false;
  const basename = result.options.basename;
  console.log('Writin results to file', basename);
  return writeFile('./bundle/' + basename + '.js', result.code);
}

// __dirname should lead to \inmotion
mkdir('./bundle')
  .catch(err => {
    // ignore errors from making directory
    console.log('Error creating directory, will ignore',err);
  })
  .then(readdir.bind(null, './app'))
  .then(recursiveTransform)
  .catch(err => console.log(err.stack));

fs.watch('./app', { recursive: true }, (eventType, filename) => {
  const directory = __dirname + '/app/';
  // grab file name through regular expression
  // cant match index.jsx this way because there is no slash in front of it
  let name = filename.match(/\/(\w+)\.jsx$/);
  console.log('SOMETHING CHANGED AT: ', directory + filename);
  console.log('FILE CHANGED: ', name)
  if (!name) name = filename.match(/\/(\w+)\.js$/);
  if (!name) {
    name = filename.match(/\/(\w+)\.css$/);
    if (name) {
      readFile(directory + filename, 'utf-8')
        .then(result => writeFile('./bundle/' + name[1] + '.css', result));
    }
  }
  if (!name) return;

  transformFile(directory + filename, {})
    .then( result => {
      return writeFile('./bundle/' + name[1] + '.js', result.code)
    })
    .then(result => console.log(result))
    .catch(e => console.log);
});
