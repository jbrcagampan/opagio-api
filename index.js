const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("./models/leads/leads.model.schema");
var config = require("./config/config");

mongoose.connect(config.mongodb, { useNewUrlParser: true }).then(() => {
  console.log('Connected to DB!')
})
var app = express();
app.use(express.json());
app.use(cors());
app.use(require("./models/leads/leads.router"));
app.listen(5000, () => {
  console.log("Server has started!");
});
module.exports = app;
