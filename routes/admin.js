const express = require('express');
const router = express.Router();
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
// add_sponsor_spreaker
router.get('/add_speaker_sponsor/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  // Render the view and pass the event ID to it
  res.render('admin/add_speaker_sponsor', { eventId });
});
router.post('/create_event', eventController.addEvent); // Handle form submission for creating an event
// router.post('/add_sponsor_spreaker', eventController.addSponsorSpreaker); // Handle form submission for creating an event
router.post('/add_sponsor', eventController.addSponsor);
router.post('/add_speaker', eventController.addSpeaker);
// router.post('/create_event',)
module.exports = router;
