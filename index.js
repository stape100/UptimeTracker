"use strict";

const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));
const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();



app.get('/api', (request, response) => {

  database.find({}, (err, data) => {
    if (err){
      response.end();
      return;
    }
    response.json(data);
  })
  
})



app.post("/api", (request, response) => {



  
  const data = request.body;
  // database.insert({ticketCount: '__autoid__', value: -1});

  // database.getAutoId = function(onFind) {
  //   database.findOne( { ticketCount: '__autoid__' }, function(err, doc) {
  //     if (err) {
  //       onFind && onFind(err)
  //     } else {
  //       // Update and returns the index value
  //       database.update({ ticketCount: '__autoid__'}, { $set: {value: ++database.length} }, {},
  //         function(err, count) {
  //           onFind && onFind(err, database.length);
  //       });
  //     }
  //   });
  //   return database;
  // } 
  data.getAutoincrementId = function (cb) {
    this.update(
        { _id: '__autoid__' },
        { $inc: { seq: 1 } },
        { upsert: true, returnUpdatedDocs: true },
        function (err, affected, autoid) { 
            cb && cb(err, autoid.seq);
        }
    );
    return this;
};
  const timestamp = Date.now();
  data.timestamp = timestamp
  const ticketnumber = database.length;
  data.ticketnumber = ticketnumber
  database.insert(data)
  

  response.json(data)
});
