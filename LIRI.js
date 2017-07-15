//  npm --init
//  npm init
'use strict';

var keys = require("./keys.js");

//  npm install --save inquirer
var inquirer = require("inquirer");
//  npm install --save request
var request = require("request");

//  npm install --save twitter
var Twitter = require("twitter");

//  npm install --save node-spotify-api
var Spotify = require('node-spotify-api');

// npm install --save cli-table
var Table = require('cli-table');

// npm install --save dateformat
var dateFormat = require('dateformat');

// npm install --save json-table
var json_tb = require('json-table');



var spotifyKeys = keys.spotifyKeys;
var spotify = new Spotify({
  id: spotifyKeys.id,
  secret: spotifyKeys.secret
});



//  npm install --save spotify
//var Spotify = require("spotify");

// Gets all of the API keys from the keys file.
var twitterKeys = keys.twitterKeys;

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

console.log('Hi, welcome to LIRI CLI');

var serviceQuestion = [
  {
    type: 'list',
    name: 'services',
    message: 'Please select a service',
    choices: ['my-tweets', 'spotify-this-song', 'movie-this','do-what-it-says'],
    filter: function (val) {
      return val.toLowerCase();
    }
  }
];

var omdbQuestion = [
  {
    type: 'input',
    name: 'movieName',
    message: 'What you want to search (e.g. Avatar):',
    validate: function(str){
      return str.length > 0;
    },
    filter: function(str) {
      return (str.length==0) ? "Mr. Nobody" : str;
    }
  }
];

var twitterQuestion = [
  {
    type: 'input',
    name: 'twitterHandler',
    message: 'Please enter twitter handler to display (e.g. realDonaldTrump):',
    validate: function(str){
      return str.length > 0;
    },
    filter: function(str) {
      return (str.length==0) ? "realDonaldTrump" : str;
    }
  }
];

var spotifyQuestion = [
  {
    type: 'input',
    name: 'songName',
    message: 'Please enter song name to search:',
    validate: function(str){
      return str.length > 0;
    }
  }
];

var askQuestion = function() {
inquirer.prompt(serviceQuestion)
	.then(function (answers) {
  		var command = answers.services;
      handleCommand(command);
	})
};

handleNewRequest();

function handleNewRequest() {
  var command = process.argv[2];
  if (null==process.argv[2]) {
    askQuestion();
  } else {
    handleCommand(command);
  }
}

function handleCommand(command) {
  switch(command) {
  case "my-tweets":
    handleTwitter();
    break;
  case "spotify-this-song":
    handleSpotify();
    break;
  case "movie-this":
    handleOMDB();
    break;
  case "do-what-it-says":
    break;
  default:
    break;
  }
}

function handleSpotify() {
  inquirer.prompt(spotifyQuestion)
  	.then(function (userInput) {
        var songName = userInput.songName;
        spotify.search({ type: 'track', query: songName }, function(error, data) {
            if (!error) {
                   var songs = data.tracks.items;

                   var table = new Table({
                       head: ['Album Name', 'Song Name']
                     , colWidths: [50, 50]
                   });

                   for (var i = 0; i < songs.length; i++) {
                     var row = [];
                     row.push(songs[i].name);
                     row.push(songs[i].album.name);
                     table.push(row);
                   }
                   console.log(table.toString());
            } else {
              console.log('Error occurred: ' + error);
            }
          });
    });
}

function handleOMDB() {
  if (null==process.argv[3]) {
      inquirer.prompt(omdbQuestion)
      	.then(function (userInput) {
            handleOMDBDisplay(userInput.movieName);
        });
  } else {
    handleOMDBDisplay(process.argv[3]);
  }
}

function handleOMDBDisplay(movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("\nResult::\n\n", JSON.parse(body, null, 2), "\n\n");
    } else {
        console.log(error);
    }
  });
}

function handleTwitter() {
  if (null==process.argv[3]) {
        inquirer.prompt(twitterQuestion)
        	.then(function (userInput) {
              handleTwitterDisplay(userInput.twitterHandler);
        });
  } else {
    handleTwitterDisplay(process.argv[3]);
  }
}

function handleTwitterDisplay(twitterHandler) {
  var searchParameters = {
      screen_name: twitterHandler
  };

  client.get('statuses/user_timeline', searchParameters, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {

        var table = new Table({
            head: ['Seq', 'Time', 'Tweet']
          // , colWidths: [5, 50,150]
        });

        for (var twitterCounter = 0; twitterCounter < 20; twitterCounter++) {
            var row = [];
            row.push(twitterCounter+1);
            row.push(dateFormat(tweets[twitterCounter].created_at, "ddd mmm/dd/yy HH:MM"));
            row.push(tweets[twitterCounter].text);
            table.push(row);
//        	      console.log(twitterCounter +". " + tweets[twitterCounter].created_at + " : " + tweets[twitterCounter].text);
        }
        console.log(table.toString());
    } else {
      console.log(error);
    }
  });

}
