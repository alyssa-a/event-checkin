const express = require('express');
const router = express.Router();

const eventController = require("../controllers/eventController");

// Admin Event Routes

// GET request for event check-in pages
router.get("/:id", eventController.event_checkin);

module.exports = router;
