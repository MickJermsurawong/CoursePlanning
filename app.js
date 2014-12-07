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
var cloudant_USERNAME="jj1192";
// The name of your database
var cloudant_DATABASE="my_course";
// These two are generated from your Cloudant dashboard of the above database.
var cloudant_KEY="thereweribledivilandicho";
var cloudant_PASSWORD="gkAN73tRcjCTtaM4UScKkul4";

var cloudant_URL = "https://" + cloudant_USERNAME + ".cloudant.com/" + cloudant_DATABASE;

//******* ROUTES *******
// GET - route to load the main page
app.get("/", function (request, response) {
	console.log("In main route");
	response.render('index');
});

app.get("/loadClass/:userID", function (request, response) {
	console.log("inloadclass app.js");
	var userID = request.params.userID;
	console.log(cloudant_URL+'/'+userID);
	Request.get({
	url: cloudant_URL+'/'+userID,
	auth: {
		user: cloudant_KEY,
		pass: cloudant_PASSWORD
		}
	}, function (error, resp, body){
		//Need to parse the body string
		var myClasses = JSON.parse(body);
		console.log(myClasses);
		response.json(myClasses);
	});
});

app.post("/saveClass", function (request, response) {
	console.log("herre");
	var data = request.body;
	console.log(data);
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
			},
		headers: {
			"Content-Type": "application/json"
			},
		body: JSON.stringify(data)
		},
		function (error, response2, body2){
			if (response2.statusCode == 201){
				console.log("Saved!");
				var msg = JSON.parse(body2);
				response.json(msg);
			}
			else if (response2.statusCode == 200){
				console.log("Uh oh...");
				response.send("...");
			}
			else{
				console.log("Uh oh...");
				console.log("Error: " + response2.statusCode);
				response.send("Something went wrong...");
			}
	});
});

app.post("/updateClass", function (request, response) {
	console.log("herre");
	var data = request.body;
	console.log(data);

	Request.get({
	url: cloudant_URL+'/'+data._id,
	auth: {
		user: cloudant_KEY,
		pass: cloudant_PASSWORD
		}
	}, function (error, response1,body){
		var myClasses = JSON.parse(body);
		myClasses.myclasses = data.myclasses;
		console.log("get data to be modifed");
		console.log(myClasses)
		Request.put({
			url: cloudant_URL+'/'+data._id,
			auth: {
				user: cloudant_KEY,
				pass: cloudant_PASSWORD
				},
			headers: {
				"Content-Type": "application/json"
				},
			json: myClasses
			},
			function (error, response2, body2){
				if (response2.statusCode == 201){
					console.log("Saved!");
					console.log(body2);
					response.json(body2);
				}
				else if (response2.statusCode == 200){
					console.log("Uh oh...");
					response.send("...");
				}
				else{
					console.log("Uh oh...");
					console.log("Error: " + response2.statusCode);
					response.send("Something went wrong...");
				}
		});
	});
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

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port' + port);