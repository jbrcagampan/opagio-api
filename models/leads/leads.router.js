var router = require('express').Router();
var controller  = require('./leads.controller');
router.post('/leads', controller.getLeads);
router.get('/leads/stats', controller.getLeadStats);
router.get('/leads/studios', controller.getStudios);
module.exports = router;