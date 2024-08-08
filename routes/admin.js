const express = require('express');
const router = express.Router();
const Event = require("../models/eventModel");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const eventController = require('../controllers/eventController');
// const Sponsor = require('../models/sponsor');
// const Speaker = require('../models/');
// const upload = require('../config/multer');



router.get('/admin',(req, res) => {
    res.render('admin/dashboard');
});
// ,isAdmin()
router.get('/create_event',(req, res) => {
    res.render('admin/create_event');
});

router.get('/list-event', eventController.showadminListEvent);

// add_sponsor_spreaker
router.get('/add_sponsor_speaker_:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  res.render('admin/add_speaker_sponsor', { eventId });
});
// Route to get the form for editing an event
router.get('/event_edit_:eventId',async (req, res) => {
  const id = parseInt(req.params.eventId);
  const event = await Event.getEventById(id);

  res.render('admin/create_event', { event });
});
router.post('/create_event', eventController.addEvent); // Handle form submission for creating an event
// router.post('/add_sponsor_spreaker', eventController.addSponsorSpreaker); // Handle form submission for creating an event
router.post('/add_sponsor', eventController.addSponsor);
router.post('/add_speaker', eventController.addSpeaker);
// router.post('/create_event',)
module.exports = router;
