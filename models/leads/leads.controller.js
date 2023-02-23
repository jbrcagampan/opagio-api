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
        let filteredResults = leads;
        if(req.body) {
          const {search, min, max, studio, type, device} = req.body;

          // FILTER SEARCH
          if(search) {
            filteredResults = filteredResults.filter(l => `${l.last_name? l.last_name.toLowerCase() : ''}, ${l.first_name ? l.first_name.toLowerCase() : ''}`.indexOf(search.toLowerCase()) > -1 || l.description.toLowerCase().indexOf(search.toLowerCase()) > -1)
          }

          // FILTER PRICE
          if(min) {
            filteredResults = filteredResults.filter(l => l.price >= min);
          }
          if(max) {
            filteredResults = filteredResults.filter(l => l.price <= max);
          }

          // FILTER STUDIO
          if(studio) {
            filteredResults = filteredResults.filter(l => l.studio === studio)
          }

          // FILTER TYPE
          if(type) {
            const selectedTypes = type.split(',');
            filteredResults = filteredResults.filter(l => {
              if(selectedTypes.indexOf("oneTime") > -1 && l.recur === false) {
                return true;
              }
              if(selectedTypes.indexOf("recurring") > -1 && l.recur === true) {
                return true;
              }
              if(selectedTypes.indexOf("invite") > -1 && l.invite_a_friend === true) {
                return true;
              }
              return false;
            });
          }

          // FILTER DEVICE
          if(device) {
            const selectedDevices = device.split(',');
            filteredResults = filteredResults.filter(l => selectedDevices.indexOf(l.device) > -1);
          }
        }
      return res.status(200).json(filteredResults);
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

exports.getStudios = function (req, res, next) {
  Leads.find().distinct("studio").then(
    async function (studios) {
      if (!studios)
        return res.status(404).json({
          code: "NOT_FOUND",
          message: "No Studios Found!",
        });
      return res.status(200).json(studios);
    },
    function (err) {
      return res.status(401).json(err);
    }
  );
};


