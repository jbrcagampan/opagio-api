var mongoose = require('mongoose')
var schema = mongoose.Schema

var leadsSchema = new schema({
    studio: String,
    first_name: String,
    last_name: String,
    description: String,
    price: Number,
    recur: Boolean,
    invite_a_friend: Boolean,
    type: String,
    promo: String,
    date: Date,
    device: String,
  
  });

module.exports = mongoose.model('leads', leadsSchema)