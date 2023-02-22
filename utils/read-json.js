const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/opagio");
}

const leadsSchema = new mongoose.Schema({
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

const Lead = mongoose.model("Leads", leadsSchema);

fs.readFile("csvjson.json", "utf8", async function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(formatData(obj[0]));
  for (let i = 0; i < obj.length; i++) {
    const lead = new Lead(formatData(obj[i]));
    await lead.save();
    console.log(i);
  }
});

const formatData = (lead) => {
  let dateTime = lead.date.split(" at");
  dateTime = dateTime[0] + dateTime[1];
  return {
    studio: lead.studio,
    last_name: lead.name.split(", ")[0],
    first_name: lead.name.split(", ")[1],
    description: lead.description,
    price: lead.recur ? lead.recur.split("£")[1] : lead.non_recur.split("£")[1],
    recur: lead.recur ? true : false,
    invite_a_friend: lead.description.toLowerCase().indexOf('friend') > -1,
    date: moment(dateTime, "MM-DD-YYYY h:ma"),
    device: lead.method.split('MoreYoga - ')[1] === "Web Site" ? "Web" : lead.method.split('MoreYoga - ')[1]
  };
};
