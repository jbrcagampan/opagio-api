const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("./models/leads/leads.model.schema");
var config = require("./config/config");

mongoose.connect(config.mongodb, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.options("*", cors());
  app.use(require("./models/leads/leads.router"));
  app.listen(5000, () => {
    console.log("Server has started!");
  });
  module.exports = app;
});
