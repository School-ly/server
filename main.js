var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const https = require('https');
const http = require('http');

const fs = require('fs');

const express = require('express')
const app = express()
const port = 80
const path = require('path');

var db;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('schoolly') // whatever your database name is

  require("greenlock-express")
  .init({
      packageRoot: __dirname,
      configDir: "./greenlock.d",
  
      // contact for security and critical bug notices
      maintainerEmail: "alex_tsvetanov_2002@abv.bg",
  
      // whether or not to run at cloudscale
      cluster: false
  })
  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(app);
});

app.get('/events/compact', (req, res) => {
    db.collection('Events').find().toArray(function(err, results) {
        res.send(JSON.stringify(results));
        // send HTML file populated with quotes here
    });
})
app.get('/events/extended', (req, res) => {
    db.collection('Events').find().toArray(function(err, results) {
        res.send(JSON.stringify(results));
        // send HTML file populated with quotes here
    });
})
app.get('/events/:id', (req, res) => {
    let id = ObjectId(req.params ['id']);
    db.collection('Events').find({'_id': id}).toArray(function(err, results) {
        res.send(JSON.stringify(results));
        // send HTML file populated with quotes here
    });
})