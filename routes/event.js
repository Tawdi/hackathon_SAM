
// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/events', eventController.showEventsPage);


router.get('/event:id/details', eventController.showEventPage);


// Update event 
router.post('/event_update_:id', eventController.updateEvent);

// Delete event
router.delete('/events_delete_:id', eventController.deleteEvent);


// Add sponsor
router.post('/event/:id/add_sponsor', eventController.addSponsor);

// Add speaker
router.post('/event/:id/add_speaker', eventController.addSpeaker);

module.exports = router;