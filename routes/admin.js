const express = require('express');
const router = express.Router();
const Event = require("../models/eventModel");
const eventController = require('../controllers/eventController');

const { ensureRole } = require('../middlewares/roleMiddleware');



router.get('/admin',ensureRole('admin'), (req, res) => {
  res.render('admin/dashboard');
});
// ,isAdmin()
router.get('/create_event',ensureRole('admin'), (req, res) => {
  
  res.render('admin/create_event' );
});

router.get('/list-event',ensureRole('admin'), eventController.showadminListEvent);

// add_sponsor_spreaker
router.get('/add_sponsor_speaker_:eventId',ensureRole('admin'), async (req, res) => {
  const eventId = req.params.eventId;

  res.render('admin/add_speaker_sponsor', { eventId });
});
// Route to get the form for editing an event
router.get('/event_edit_:eventId',ensureRole('admin'), async (req, res) => {
  const id = parseInt(req.params.eventId);
  const event = await Event.getEventById(id);

  res.render('admin/update_event', { event });
});
router.post('/event_update_:eventId',ensureRole('admin'), eventController.updateEvent); // Handle form submission for creating an event

router.post('/create_event',ensureRole('admin'), eventController.addEvent); // Handle form submission for creating an event
router.post('/add_sponsor',ensureRole('admin'), eventController.addSponsor);
router.post('/add_speaker',ensureRole('admin'), eventController.addSpeaker);

module.exports = router;
