var mongoose = require("mongoose");
var Leads = mongoose.model("leads");

exports.getLeads = function (req, res, next) {
  Leads.find().then(
    async function (leads) {
      if (!leads)
        return res.status(404).json({
          code: "NOT_FOUND",
          message: "No Leads Found!",
        });
      return res.status(200).json(leads);
    },
    function (err) {
      return res.status(401).json(err);
    }
  );
};

exports.getLeadStats = function (req, res, next) {
  Leads.find().then(
    async function (leads) {
      if (!leads)
        return res.status(404).json({
          code: "NOT_FOUND",
          message: "No Leads Found!",
        });
      return res.status(200).json({
        users: leads.length,
        web: leads.filter(l => l.device === "Web").length,
        android: leads.filter(l => l.device === "Android").length,
        iphone: leads.filter(l => l.device === "iPhone").length,
      });
    },
    function (err) {
      return res.status(401).json(err);
    }
  );
};
