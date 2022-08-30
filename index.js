"use strict";

const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));
const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  database.insert(data);
  response.json({
    confirmation: "Report Submitted",
    site: data.site,
    status: data.status,
    date: data.date,
  });
});
