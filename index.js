"use strict";

const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));
const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.delete("/api", (request, response) => {
  toDelete = request.body;
  database.remove({ ticketNumber: toDelete }, {}, function (err, numRemoved) {
    if (err) {
      response.end();
      return;
    }
    response.json("Entry" + toDelete + "Deleted");
  });
});

app.put("/api", (request, response) => {
  let data = request.body;

  database.remove(
    { ticketNumber: data.ticketNumber },
    {},
    function (err, numRemoved) {
      if (err) {
        response.end();
        return;
      }
      response.json(data);

      // numRemoved = 1
    }
  );

  database.insert(data);
});

app.post("/api", (request, response) => {
  const data = request.body;

  data.getAutoincrementId = function (cb) {
    this.update(
      { _id: "__autoid__" },
      { $inc: { seq: 1 } },
      { upsert: true, returnUpdatedDocs: true },
      function (err, affected, autoid) {
        cb && cb(err, autoid.seq);
      }
    );
    return this;
  };
  const timestamp = Date.now();
  data.timestamp = timestamp;
  const ticketnumber = database.length;
  data.ticketnumber = ticketnumber;
  // database.insert(data);
  // database.remove(
  //   { ticketNumber: data.ticketNumber },
  //   { multi: true },
  //   function (err, numRemoved) {}
  // );
  database.find({ ticketNumber: data.ticketNumber }, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    if (docs === []) {
      database.insert(data);
      // database.update(
      //   { ticketNumber: data.ticketNumber },
      //   {
      //     ticketNumber: data.ticketNumber,
      //     site: data.site,
      //     siteStatus: data.siteStatus,
      //     date: data.date,
      //     ticketStatus: data.ticketStatus,
      //     downtimeReason: data.downtimeReason,
      //     info: data.info,
      //     timeResolved: data.timeResolved,
      //   },
      //   { upsert: true },
      //   function (err, numRelaced) {}
      // );
    } else {
      database.remove(
        { ticketNumber: data.ticketNumber },
        { multi: true },
        function (err, numRemoved) {}
      );
      database.insert(data);
      // database.update(
      //   { _id: data._id },
      //   {
      //     ticketNumber: data.ticketNumber,
      //     site: data.site,
      //     siteStatus: data.siteStatus,
      //     date: data.date,
      //     ticketStatus: data.ticketStatus,
      //     downtimeReason: data.downtimeReason,
      //     info: data.info,
      //     timeResolved: data.timeResolved,
      //   },
      //   { upsert: true },
      //   function (err, numRelaced) {}
      // );
    }
  });

  response.json(data);
});
