// controllers/eventController.js
// const EventModel = require('../models/eventModel');

// const getAllEvents = (req, res) => {
//   EventModel.getAllEvents(events => {
//     res.json(events);
//   });
// };

// const getEventById = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.getEventById(id, event => {
//     res.json(event);
//   });
// };

// const createEvent = (req, res) => {
//   const eventData = req.body;
//   EventModel.createEvent(eventData, id => {
//     res.status(201).json({ id });
//   });
// };

// const updateEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const eventData = req.body;
//   EventModel.updateEvent(id, eventData, affectedRows => {
//     res.json({ affectedRows });
//   });
// };

// const deleteEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.deleteEvent(id, affectedRows => {
//     res.json({ affectedRows });
//   });
// };

// module.exports = {
//   getAllEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent
// };
// controllers/eventController.js
// **********************************************
// const EventModel = require('../models/eventModel');

// // const getAllEvents = (req, res) => {
// //   EventModel.getAllEvents(events => {
// //     res.render('event/evenement_list', { events });
// //   });
// // };
// // const getAllEvents = (req, res) => {
// //     EventModel.getAllEvents(events => {
// //       res.render('event/evenement_list', { events, messages: req.flash() });
// //     });
// //   };
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await EventModel.getAllEvents();
//         console.log('Events fetched:', events); // Debugging line
//         res.render('event/evenement_list', { events, messages: req.flash() });
//     } catch (error) {
//         console.error('Error in getAllEvents:', error); // Debugging line
//         res.status(500).send('Internal Server Error');
//     }
// };
// const getEventById = (req, res) => {
//     const id = parseInt(req.params.id);
//     EventModel.getEventById(id, event => {
//         res.render('event/details', { event });
//     });
// };

// const createEvent = (req, res) => {
//   const eventData = req.body;
//   EventModel.createEvent(eventData, id => {
//     req.flash('success', 'Event created successfully');
//     res.redirect('/event');
//   });
// };

// const updateEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const eventData = req.body;
//   EventModel.updateEvent(id, eventData, affectedRows => {
//     req.flash('success', 'Event updated successfully');
//     res.redirect('/event');
//   });
// };

// const deleteEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.deleteEvent(id, affectedRows => {
//     req.flash('success', 'Event deleted successfully');
//     res.redirect('/event');
//   });
// };

// module.exports = {
//   getAllEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent
// };

// ******************************

const EventModel = require('../models/eventModel');

// Fetch all events and render them
const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.getAllEvents();
        // console.log('Events fetched:', events); // Debugging line
        res.render('event/evenement_list', { events, messages: req.flash() });
    } catch (error) {
        console.error('Error in getAllEvents:', error); // Debugging line
        res.status(500).send('Internal Server Error');
    }
};

// Fetch a single event by ID and render it
const getEventById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const event = await EventModel.getEventById(id);
        if (event) {
            res.render('event/details', { event });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Error in getEventById:', error); // Debugging line
        res.status(500).send('Internal Server Error');
    }
};

// Create a new event
const createEvent = async (req, res) => {
    const eventData = req.body;
    try {
        await EventModel.createEvent(eventData);
        req.flash('success', 'Event created successfully');
        res.redirect('/event');
    } catch (error) {
        console.error('Error in createEvent:', error); // Debugging line
        req.flash('error', 'Failed to create event');
        res.redirect('/event');
    }
};

// Update an existing event
const updateEvent = async (req, res) => {
    const id = parseInt(req.params.id);
    const eventData = req.body;
    try {
        const affectedRows = await EventModel.updateEvent(id, eventData);
        if (affectedRows > 0) {
            req.flash('success', 'Event updated successfully');
        } else {
            req.flash('error', 'Event not found or no changes made');
        }
        res.redirect('/event');
    } catch (error) {
        console.error('Error in updateEvent:', error); // Debugging line
        req.flash('error', 'Failed to update event');
        res.redirect('/event');
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const affectedRows = await EventModel.deleteEvent(id);
        if (affectedRows > 0) {
            req.flash('success', 'Event deleted successfully');
        } else {
            req.flash('error', 'Event not found');
        }
        res.redirect('/event');
    } catch (error) {
        console.error('Error in deleteEvent:', error); // Debugging line
        req.flash('error', 'Failed to delete event');
        res.redirect('/event');
    }
}; 

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};


// *************


// const eventModel = require('../models/eventModel');
// const speakerModel = require('../models/speakerModel');
// const sponsorModel = require('../models/sponsorModel');

// exports.createEvent = async (req, res) => {
//     const eventData = req.body;

//     try {
//         // Create the event and get the event ID
//         const eventId = await eventModel.createEvent(eventData);

//         // Add sponsors and speakers for the event
//         if (eventData.sponsors) {
//             await sponsorModel.addSponsors(eventData.sponsors, eventId);
//         }

//         if (eventData.speakers) {
//             await speakerModel.addSpeakers(eventData.speakers, eventId);
//         }

//         res.redirect('/events');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de la création de l\'événement.');
//     }
// };
