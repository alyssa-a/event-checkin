const { Event, Attendee } = require('../models/sequelize');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


//Handle Attendee create on POST
exports.attendee_create_post = [
    body("first_name").trim(),
    body("last_name").trim(),
    body("degree1").trim(),
    body("degree2").trim(),
    body("degree3").trim(),
    asyncHandler(async (req, res, next) => {
        await Attendee.create({ 
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            degree1: req.body.degree1,
            degree2: req.body.degree2,
            degree3: req.body.degree3,
            eventId: req.body.event_id
        });

        res.redirect("back");
    }),
];

// Handle Attendee delete on POST.
exports.attendee_delete_post = asyncHandler(async (req, res, next) => {
    await Attendee.destroy({
        where: {
            id: req.body.attendeeId
        }
    });
    res.redirect("back");
  });

// Handle Attendee update on GET.
exports.attendee_update_get = asyncHandler(async (req, res, next) => {
    const attendee = await Attendee.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(attendee);
  });

// Handle Attendee update on POST.
exports.attendee_update_post = [
    body("first_name").trim(),
    body("last_name").trim(),
    body("degree1").trim(),
    body("degree2").trim(),
    body("degree3").trim(),
    asyncHandler(async (req, res, next) => {
        await Attendee.update({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            degree1: req.body.degree1,
            degree2: req.body.degree2,
            degree3: req.body.degree3
        }, {
            where: {
                id: req.params.id
            }
        });
        
        res.redirect("back");
    }),
];