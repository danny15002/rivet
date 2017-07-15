
To build and run the project:
1. run node devBuild.js in one terminal, this will transpile the jsx files to js
    and watch for changing files in the app/ directory if it's left running. node devBuild
    will not properly build files on windows unless the regex lines are commented out and the
    commented out regex lines are uncommented.
2. node server/server.js
