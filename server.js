const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs'); 
const vision = require('@google-cloud/vision');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/bestbefore";
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connect(url, {useNewUrlParser: true}, function(error){
    if(error) console.log(error);

        console.log("connection successful");
});

//schema
var schema = new mongoose.Schema({
  name: String
  //bestbefore: Date
});

//variable to get this id from table in index.html and send the data to edit.html
var getDataId = "";

// var newdata = mongoose.model('newdata', schema);

// //creates a client
// const client = new vision.ImageAnnotatorClient();
// client
//   .labelDetection('./egg.jpg')
//   .then(results => {
//       const labels = results[0].labelAnnotations;
//       console.log('Labels:');
//       objects = labels[0].description;
//       console.log(objects);

//       // labels.forEach(label => console.log(label.description));
      
//   })
//   .catch (err => {
//       console.error('ERROR:', err);
//   })

//create a database about cloud vision api objects description from mongodb 
// var objects = null;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('db is connected');
//   newdata.create({name: objects}, (err, newdata) => {
//     if(err) return handelError(err);
//     else console.log(objects + 'db is created');
//     // return db.close();
//   });
// });
// var db = mongoose.connection;


app.get('/bestbefore/find', function (req, res){
  console.log('find');
  // var db = mongoose.connect(url, {useNewUrlParser: true});
  var newdatas = mongoose.model('newdata', schema);
  newdatas.find({}, function (err, users) {
    var userMap = [];
    users.forEach(function(user) {
      userMap.push(user);
    });
    res.send(userMap);  
  });
});

app.post('/bestbefore/delete', function (req, res){
  console.log('delete');
  var id = req.body.array;
  var newdatas = mongoose.model('newdata', schema);
  id.forEach(function (element) {
    newdatas.deleteOne({ _id: element }, (err, data) => {
      // As always, handle any potential errors:
      if (err)
        throw err;
      else
        console.log(element + 'is successfully removed');
        res.send('success');
    });
  })
  // newdatas.find({}, function (err, users) {
  //   var userMap = [];
  //   users.forEach(function(user) {
  //     userMap.push(user);
  //   });
  //   console.log('sss');
  //   res.send(userMap);  
  // });

});

app.post('/bestbefore/send_data', function (req, res){
  console.log('send_data');
  getDataId = req.body.new_array;
  console.log(getDataId);
  res.send('success');
})

app.get('/bestbefore/get_data', function (req, res){
  console.log('get_data');
  var newdatas = mongoose.model('newdata', schema);
  newdatas.findOne({_id: getDataId}, function (err, user_data) {
    var userMap = [];
    console.log(user_data);
    userMap.push(user_data);
    res.send(userMap);  
  }); 
})

app.post('/bestbefore/edit_data', function (req, res){
  console.log('edit_data');
  editData = req.body;
  console.log(editData);
  var newdatas = mongoose.model('newdata', schema);
  newdatas.findByIdAndUpdate(req.body._id, editData, (err, data) => {
      if (err)
          throw err;
        else
          console.log(req.body._id + 'is successfully edited');
          res.send('success');
    });
});

app.post('/bestbefore/create', function (req, res){
  console.log('create');
  var newdatas = mongoose.model('newdata', schema);
  var data = {
    name: req.body.name,
    // lastname: req.body.lastname,
    // phone_number: req.body.phone_number
  };
  newdatas.create(data, (err, userdata) => {
    if (err)
        throw err;
      else
        console.log(req.body.name + ' is successfully created');
  })
  res.send('success');
})

app.listen(port, () => {
  console.log('Check out the app at http://localhost:${PORT}')
});

// Creates a client

  /*
  async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}
   */