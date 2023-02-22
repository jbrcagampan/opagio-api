var router = require('express').Router();
var controller  = require('./leads.controller');
router.get('/test', controller.test);
router.get('/leads', controller.getLeads);
router.get('/leads/stats', controller.getLeadStats);
module.exports = router;