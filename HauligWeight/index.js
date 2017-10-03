var express = require('express');
var cors = require("cors");

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {

   // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
    next();
});

var http = require( "http" );
var Hello = require('./Services/helloworld.js').Hello(app);
var server = http.createServer(app).listen(process.env.PORT || 1337, function () {

 var host = server.address().address
  var port = server.address().port

 console.log("Example app listening at http://%s:%s", host, port)

});
