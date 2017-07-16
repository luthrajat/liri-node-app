===================================================================================
Keys - create a keys.js file to provide Twitter and Spotify Keys.
===================================================================================

exports.twitterKeys = {
  consumer_key: '<somekey>',
  consumer_secret: '<somekey>',
  access_token_key: '<somekey>',
  access_token_secret: '<somekey>'
}

exports.spotifyKeys = {
  id: '<somekey>',
  secret: '<somekey>'
}

===================================================================================
USAGE
===================================================================================

Twitter:
========
1. node LIRI.js 
2. node LIRI.js my-tweets
3. node LIRI.js my-tweets <any twitter hander>

OMDB
====
1. node LIRI.js
2. node LIRI.js movie-this 
3. node LIRI.js movie-this <any movie title>

Spotify
=======

===================================================================================
Project init
===================================================================================

RajatlMBA:liri-node-app bootcamp$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (liri-node-app) liri
version: (1.0.0) 0.0.1
description: Liri CLI to support Twitter, OMDB and Spotify
entry point: (index.js) liri.js
test command: 
git repository: https://github.com/luthrajat/liri-node-app.git
keywords: liri,twitter,spotify,omdb,node,inquirer
author: rajatl
license: (ISC) ISC
About to write to /Users/bootcamp/Desktop/UCLA/Backend/Classroom/node/liri-node-app/package.json:

{
  "name": "liri",
  "version": "0.0.1",
  "description": "Liri CLI to support Twitter, OMDB and Spotify",
  "main": "liri.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/luthrajat/liri-node-app.git"
  },
  "keywords": [
    "liri",
    "twitter",
    "spotify",
    "omdb",
    "node",
    "inquirer"
  ],
  "author": "rajatl",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/luthrajat/liri-node-app/issues"
  },
  "homepage": "https://github.com/luthrajat/liri-node-app#readme"
}

