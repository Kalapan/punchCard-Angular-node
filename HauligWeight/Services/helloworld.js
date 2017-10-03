var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//connection string;
var mURL = "mongodb://Kalapan:2325xu2t@test-shard-00-00-oemjr.mongodb.net:27017,test-shard-00-01-oemjr.mongodb.net:27017,test-shard-00-02-oemjr.mongodb.net:27017/test?ssl=true&replicaSet=Test-shard-0&authSource=admin";
var promise = mongoose.connect(mURL, {
  useMongoClient: true,
});
exports.Hello = function (app) {

  //collection name string;
  var collection = 'test';
  //collection scheme
  var testSchema = new Schema({
     _test_firstName: { type: String, default: ''},
     _test_lastName: { type: String, default: ''},
     _punchInTime: { type: Date, default: Date.now },
     _punchOutTime: { type: Date, default: Date.now },
  });

  var testData = {
    _test_firstName: 'Kalapan',
    _test_lastName: 'Kalapan',
    _punchInTime: new Date('01-01-2005'),
    _punchOutTime: new Date('02-02-2005')
  }

  var partialTestData = {
    _test_name: 'Darren'
  }
  //collection
  testSchema.query.byTestName = function(testname) {
    return this.find({ _test_firstName: new RegExp(testname,'i') });
  }

  testSchema.query.byID = function(id) {
    return this.find({ _id: ObjectId(id) });
  }

  // Create the connection to database with collection and scheme defined;
  var punchCard = mongoose.model(collection,testSchema);


  app.get('/getPunchCard',function (request,response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
   punchCard.find().exec(function( err, docs){
      response.end(JSON.stringify(docs));
    });
  });

  app.post('/postPunchCard',function (request,response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
   punchCard.create(request.body, function(err,doc){
      response.end(JSON.stringify(doc));
    });
  });

  app.delete('/deletePunchCard',function (request,response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var id = request.query.ID;
   punchCard.find().byID(id).remove().exec(function (err, doc) {
     response.end(JSON.stringify(doc));
    });
  });
  var Helloworldstring = 'Hi this is hello world.';

  var handleError = function(err){
  console.log("Got an error", err);
  }
}

/*  app.get ('/retrieveByName', function (req,res){
    var testname = request.query.ID;
    response.writeHead(200, {"Content-Type": "text/plain"});
    Assets.find().byTestName(testname).exec(function( err, docs){
      response.end(JSON.stringify(docs));
    });
  });
  //creat function
  app.get('/create',function (request,response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
  /*  Assets.create(testData, function(err,doc){
      response.end(JSON.stringify(doc));
    });
    //Search testData for _test_name
    var search_term = testData._test_firstName;
    console.log(search_term);
    //Using byTestName find the search_term
    Assets.find().byTestName(search_term).exec(function(err,doc){
      console.log(doc[0]);
      //Find the document by it's id
      Assets.findById(doc[0]._id, function(err,_doc){
        //Set the document with partialTestData (update)
        _doc.set(partialTestData);
        //Save the update
        _doc.save(function (err, updatedAsset){
          //If there is and error, use handleError function
          if (err) return handleError(err);
          console.log("updated: " + updatedAsset);
          response.end(JSON.stringify(updatedAsset));
        })
      })
     if (err) return handleError(err);
    });
  });
*/
