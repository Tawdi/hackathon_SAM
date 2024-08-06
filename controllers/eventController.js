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
const EventModel = require('../models/eventModel');

const getAllEvents = (req, res) => {
  EventModel.getAllEvents(events => {
    res.render('event/eventView', { events });
  });
};
const getEventById = (req, res) => {
  const id = parseInt(req.params.id);
  EventModel.getEventById(id, event => {
    res.render('eventDetail', { event });
  });
};

const createEvent = (req, res) => {
  const eventData = req.body;
  EventModel.createEvent(eventData, id => {
    req.flash('success', 'Event created successfully');
    res.redirect('/event');
  });
};

const updateEvent = (req, res) => {
  const id = parseInt(req.params.id);
  const eventData = req.body;
  EventModel.updateEvent(id, eventData, affectedRows => {
    req.flash('success', 'Event updated successfully');
    res.redirect('/event');
  });
};

const deleteEvent = (req, res) => {
  const id = parseInt(req.params.id);
  EventModel.deleteEvent(id, affectedRows => {
    req.flash('success', 'Event deleted successfully');
    res.redirect('/event');
  });
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
