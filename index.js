const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("./models/leads/leads.model.schema");
var config = require("./config/config");

mongoose.connect(config.mongodb, { useNewUrlParser: true });
var app = express();
app.use(cors());
app.use(require("./models/leads/leads.router"));
app.listen(5000, () => {
  console.log("Server has started!");
});
module.exports = app;
