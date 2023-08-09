const { Event, Attendee } = require('../models/sequelize');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const xlsx = require('xlsx');


// Display list of all Events for admin.
exports.event_list_admin = asyncHandler(async (req, res, next) => {
    const allEvents = await Event.findAll({
        order: [["id", "DESC"]]
    });
    res.render("admin", {
      title: "Manage Events",
      events: allEvents,
    });
  });

// Display list of all Events for index.
exports.event_list = asyncHandler(async (req, res, next) => {
    const allEvents = await Event.findAll();
    res.render("index", {
      title: "All Events",
      events: allEvents,
    });
  });

// Display check-in page for a specific Event.
exports.event_checkin = asyncHandler(async (req, res, next) => {
    const event = await Event.findOne({
        where: {
            id: req.params.id
        }
    });

    const allAttendees = await Attendee.findAll({
        where: {
            eventId: req.params.id
        }
    });

    res.render("checkin", {
      title: event.name,
      eventId: event.id,
      attendees: allAttendees
    });
  });

// Display Event create form on GET.
exports.event_create_get = (req, res) => {
    res.render('create-event', { title: 'Create Event' });
};

// Handle Event create on POST.
exports.event_create_post = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please specify an event name."),
    body("short_url")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please specify a short URL for this event."),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const event = Event.build({ 
            name: req.body.name,
            shortUrl: req.body.short_url
        });

        if (!errors.isEmpty()) {
            res.render('create-event', { title: 'Create Event', errors: errors.array() });
            return;
        } else {
            await event.save();
            if (req.file) {
                const buffer = req.file.buffer;
                const workbook = xlsx.read(buffer, {type: "buffer"});
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = xlsx.utils.sheet_to_json(sheet);
                rows.forEach(async (row, index) => {
                    await Attendee.create({
                        firstName: row.First ? row.First : null,
                        lastName: row.Last ? row.Last : null,
                        degree1: row.Degree1 ? row.Degree1 : null,
                        degree2: row.Degree2 ? row.Degree2 : null,
                        degree3: row.Degree3 ? row.Degree3 : null,
                        eventId: event.id
                    });
                });
                res.redirect("/admin/event/" + event.id + "/update");
            } else {
                res.redirect("/admin/event/" + event.id + "/update");
            }
        }
    }),
];

// Handle Event delete on POST.
exports.event_delete_post = asyncHandler(async (req, res, next) => {
    await Attendee.destroy({
        where: {
            eventId: req.body.eventId
        }
    });
    await Event.destroy({
        where: {
            id: req.body.eventId
        }
    });
    res.redirect("/admin");
  });

// Display Event update form on GET.
exports.event_update_get = asyncHandler(async (req, res, next) => {
    const event = await Event.findOne({
        where: {
            id: req.params.id
        }
    });

    const allAttendees = await Attendee.findAll({
        where: {
            eventId: req.params.id
        }
    })

    res.render("edit-event", {
      title: event.name,
      event: event,
      attendees: allAttendees
    });
  });

// Handle Event update on POST.
exports.event_update_post = [
    body("name").trim(),
    body("short_url").trim(),
    asyncHandler(async (req, res, next) => {
        const eventId = req.params.id;

        await Event.update({
            name: req.body.name,
            shortUrl: req.body.short_url
        }, {
            where: {
                id: eventId
            }
        });

        res.redirect("/admin/event/" + eventId + "/update");
    }),
];
