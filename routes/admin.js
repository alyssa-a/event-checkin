const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const eventController = require("../controllers/eventController");
const attendeeController = require("../controllers/attendeeController");

/*---- EVENT ROUTES ----*/

// GET request for creating an Event. NOTE This must come before route for id.
router.get("/create-event", eventController.event_create_get);

// POST request for creating Event.
router.post("/create-event", upload.single("attendees"), eventController.event_create_post);

// POST request to delete Event.
router.post("/event/:id/delete", eventController.event_delete_post);

// GET request to update Event.
router.get("/event/:id/update", eventController.event_update_get);

// POST request to update Event.
router.post("/event/:id/update", eventController.event_update_post);

// GET request for one Event.
router.get("/event/:id", eventController.event_checkin);

// GET request for list of all Events.
router.get("/", eventController.event_list_admin);

/*---- ATTENDEE ROUTES ----*/

// POST request for creating Attendee.
router.post("/create-attendee", attendeeController.attendee_create_post);

// POST request to delete Attendee.
router.post("/attendee/:id/delete", attendeeController.attendee_delete_post);

// GET request to update Attendee.
router.get("/attendee/:id/update", attendeeController.attendee_update_get);

// POST request to update Attendee.
router.post("/attendee/:id/update", attendeeController.attendee_update_post);

module.exports = router;
