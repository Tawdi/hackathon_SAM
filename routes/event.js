
// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const middleware = require('../middlewares/auth')

// router.get('/', eventController.showEventsPage);

// Route to get a specific event by ID
// router.get('/:id', eventController.getEventById);

// Route to create a new event
// router.get('/create', (req, res) => {
//     res.render('event/new'); // Render the form for creating a new event
// });

// Route to update an event
// router.get('/:id/edit', async (req, res) => {
//     const id = parseInt(req.params.id);
//     try {
//         const event = await eventController.getEventById(req, res);
//         if (event) {
//             res.render('event/edit', { event }); // Render the form for editing the event
//         } else {
//             res.status(404).send('Event not found');
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// router.put('/:id', eventController.updateEvent); // Handle form submission for updating an event

// // Route to delete an event
// router.delete('/:id', eventController.deleteEvent); // Handle form submission for deleting an event



// 
router.get('/events', eventController.showEventsPage);

// Show single event by ID
// router.get('/event/:id', eventController.getEventById);

// Show home page with events and news
// router.get('/en', eventController.showHomePage);

// Show specific event page
router.get('/event/:id/details', eventController.showEventPage);

// Add new event
router.post('/events/add', eventController.addEvent);

// Update event 
router.post('/events/update/:id', eventController.updateEvent);

// Delete event
router.delete('/events/delete/:id', eventController.deleteEvent);

// Add sponsor and speaker
// router.post('/event/:id/add_sponsor_speaker', eventController.addSponsorSpreaker);

// Add sponsor
router.post('/event/:id/add_sponsor', eventController.addSponsor);

// Add speaker
router.post('/event/:id/add_speaker', eventController.addSpeaker);

module.exports = router;