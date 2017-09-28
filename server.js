var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var uriUtility = require('mongodb-uri');
var Celebs = require('./models/celebs'); // works without .js

var mongodbUri = 'mongodb://localhost/celebs'; // connects to localhost db
var mongooseUri = uriUtility.formatMongoose(mongodbUri);

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}},
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}}
};
mongoose.connect(mongodbUri, options);

var app = express();
app.use(bodyParser.json({
  type: 'application/json'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
}); 
 
app.get("/celebs", function (req, res) {
   Celebs.find(function(err, celebs){
    res.json(celebs);
  });
});
 
app.post("/celebs", function(req, res) {
  var celeb = new Celebs();
  celeb.name  = req.body.name;
  celeb.dob = req.body.dob;
  celeb.starredIn = req.body.starredIn;
  celeb.imgurl = req.body.imgurl;
  celeb.save(function(err, celebReturned) {
    res.json("name received " + celebReturned);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Listening on " + port);
});