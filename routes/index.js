var express = require('express');
var router = express.Router();

const eventController = require("../controllers/eventController");

/* GET home page (list of links to all event check-in pages). */
router.get("/", eventController.event_list);

module.exports = router;
