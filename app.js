var express = require('express');
var Request = require('request');
var bodyParser = require('body-parser');

var app = express();

// Set up the public directory to serve our Javascript file
app.use(express.static(__dirname + '/public'));
// Set EJS as templating language
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// Enable json body parsing of application/json
app.use(bodyParser.json());

//******* DATABASE Configuration *******
// The username you use to log in to cloudant.com
var CLOUDANT_USERNAME="";
// The name of your database
var CLOUDANT_DATABASE="";
// These two are generated from your Cloudant dashboard of the above database.
var CLOUDANT_KEY="";
var CLOUDANT_PASSWORD="";

var CLOUDANT_URL = "https://" + CLOUDANT_USERNAME + ".cloudant.com/" + CLOUDANT_DATABASE;

//******* ROUTES *******
// GET - route to load the main page
app.get("/", function (request, response) {
	console.log("In main route");
	response.render('index');
});

// GET - Route to load the view and client side javascript to display the notes.
app.get("/:key", function (request, response) {
	console.log("In key...");
	response.send(request.params.key);
});

// GET - Catch All route
app.get("*", function(request,response){
	response.redirect('/');
});

app.listen(5000);
console.log('Express started on port 5000');