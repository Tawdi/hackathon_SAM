
// ************
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs").promises;
const Event = require("../models/eventModel");
const Speaker = require("../models/Speaker");
const Program = require("../models/Program");
const Candidature = require("../models/Candidature");
// const multer = require('multer');
const upload = require('../config/multer');


// Show all events page
module.exports.showEventsPage = async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    res.render("event/evenement_list", { events });
  } catch (err) {
    console.error("Error fetching events:", err);
    req.flash("error_msg", "Error fetching events.");
    res.redirect("/");
  }
};
module.exports.showEventsUserPage = async (req, res) => {
  try {
    const events_past = await Event.getAllEvents();
    const events_present = await Event.getAllEvents();

    const events_future = await Event.getAllEvents();
    res.render("pages/evenements", { 
      events_future ,
      events_present,
      events_past, 
      title: "Événements"
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    req.flash("error_msg", "Error fetching events.");
    res.redirect("/");
  }
};

// Fetch a single event by ID and render it
module.exports.getEventById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const event = await Event.getEventById(id);
        if (event) {
            res.render('event/details', { event , title: event.titre });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Error in getEventById:', error); // Debugging line
        res.status(500).send('Internal Server Error');
    }
};


module.exports.showHomePage = async (req, res) => {
    try {
      // Fetch events data
      const events = await Event.getAllEvents();
  
      // Fetch news data from the JSON file
      const newsFilePath = path.join(__dirname, "../data/news.json"); // Adjust the path if needed
      const newsData = await fs.readFile(newsFilePath, "utf8");
      const newsArray = JSON.parse(newsData);
  
      // Render the home page with both events and news data
      res.render("home", { events, news: newsArray });
    } catch (err) {
      console.error("Error fetching events or news:", err);
      req.flash("error_msg", "Error fetching events or news.");
      res.redirect("/");
    }
  };

module.exports.showadminListEvent = async (req, res) => {
    try {

      const events = await Event.getAllEvents();
  
     
      res.render('admin/list-event',{ events});
    } catch (err) {
      console.error("Error fetching events ", err);
      req.flash("error_msg", "Error fetching events .");
      res.redirect("/admin");
    }
  };
// Show specific event page

const validateTime = (value) => {
  return !value || /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
};

module.exports.addEvent = [
  upload.single('image_url'), // Handle single file upload

  body("titre")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .trim()
    .escape(),
  body("apercu")
    .isLength({ min: 3 })
    .withMessage("Apercu must be at least 3 characters long")
    .trim()
    .escape(),
  body("description")
    .optional()
    .trim()
    .escape(),
  body("date_debut")
    .isISO8601()
    .withMessage("Date Debut must be a valid ISO date"),
  body("date_fin")
    .optional()
    .custom(value => {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Date Fin must be a valid ISO date");
      }
      return true;
    }),
  body("time")
    .optional()
    .custom(value => {
      if (value && !validateTime(value)) {
        throw new Error("Time must be a valid time in HH:MM format");
      }
      return true;
    }),
  body("lieu")
    .isLength({ min: 3 })
    .withMessage("Lieu must be at least 3 characters long")
    .trim()
    .escape(),
  body("observations").optional().trim().escape(),
  body("participation").optional().trim().escape(),
  body("info_add").optional().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()); // Log the validation errors
      req.flash(
        "error_msg",
        errors.array().map((err) => err.msg)
      );
      return res.redirect("/create_event");
    }

    const {
      titre,
      apercu,
      description,
      date_debut,
      date_fin,
      time,
      lieu,
      observations,
      participation,
      info_add,
    } = req.body;

    // Handle image URL  
    // const imageUrl = req.file ? `/${req.file.filename}` : null;
    const imageUrl = req.file ? `/img/${req.file.filename}` : null;
    // Set date_fin and time to null if not defined
    const finalDateFin = date_fin ? date_fin : null;
    const finalTime = time ? time : null;

    try {
        const eventId = await Event.addEvent(
        titre,
        apercu,
        description,
        imageUrl,
        date_debut,
        finalDateFin,
        finalTime,
        lieu,
        observations,
        participation,
        info_add
      );
      req.flash("success_msg", "Event added successfully.");
      res.redirect(`/add_sponsor_speaker_${eventId}`);
    } catch (err) {
      console.error("Error adding event:", err);
      req.flash("error_msg", "Error adding event.");
      res.redirect("/create_event");
    }
  },
];

  

module.exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.deleteEvent(id);
    req.flash("success_msg", "Event deleted successfully.");
    res.redirect("/events");
  } catch (err) {
    console.error("Error deleting event:", err);
    req.flash("error_msg", "Error deleting event.");
    res.redirect("/events");
  }
};

  


module.exports.updateEvent = [
  upload.single('image_url'),
  body("titre")
  .isLength({ min: 3 })
  .withMessage("Title must be at least 3 characters long")
  .trim()
  .escape(),
body("apercu")
  .isLength({ min: 3 })
  .withMessage("Apercu must be at least 3 characters long")
  .trim()
  .escape(),
body("description")
  .optional()
  .trim()
  .escape(),
body("date_debut")
  .isISO8601()
  .withMessage("Date Debut must be a valid ISO date"),
body("date_fin")
  .optional()
  .custom(value => {
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error("Date Fin must be a valid ISO date");
    }
    return true;
  }),
body("time")
  .optional()
  .custom(value => {
    if (value && !validateTime(value)) {
    //   throw new Error("Time must be a valid time in HH:MM format");
    return true;
    }
    return true;
  }),
body("lieu")
  .isLength({ min: 3 })
  .withMessage("Lieu must be at least 3 characters long")
  .trim()
  .escape(),
body("observations").optional().trim().escape(),
body("participation").optional().trim().escape(),
body("info_add").optional().trim().escape(),


  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array().map(err => err.msg));
      return res.redirect(`/event_edit_${req.params.id}`);
    }

    const {
      titre, apercu, description, date_debut, date_fin, time, lieu,
      observations, participation, info_add
    } = req.body;
let imageUrl;
    if (req.file) {
      // New image uploaded
      imageUrl = `/img/${req.file.filename}`;
    } else if (req.body.existing_image_url) {
      // No new image, use the existing image URL
      imageUrl = req.body.existing_image_url;
    } else {
      // No image provided or uploaded, handle this case appropriately
      req.flash('error_msg', 'Please provide an image.');
      return res.redirect(`/event_edit_${req.params.id}`);
    }
    // Handle image update: Use uploaded file or retain existing one. const imageUrl = req.file ? `/img/${req.file.filename}` : null
    // const imageUrl = req.file ? `/img/${req.file.filename}` : req.body.existing_image_url;
    const event_id = parseInt(req.params.id);
    try {
      // Update event with the provided details
      await Event.updateEvent(event_id, {
        titre, apercu, description, image_url: imageUrl, date_debut, date_fin, time, lieu,
        observations, participation, info_add
      });

      req.flash('success_msg', 'Event updated successfully.');
      res.redirect('/list-event');
    } catch (err) {
      console.error('Error updating event:', err);
      req.flash('error_msg', 'Error updating event.');
      res.redirect(`/event_edit_${req.params.id}`);
    }
  }
];

// kkkkkkkkk
// EventController.js (Controller)

// module.exports.updateEvent = async (req, res) => {
//   const { id } = req.params;
//   const {
//     titre,
//     apercu,
//     description,
//     date_debut,
//     date_fin,
//     time,
//     lieu,
//     observations,
//     participation,
//     info_add,
//   } = req.body;

//   // Log the request body for debugging
//   console.log("Request Body:", req.body);
  
//   // Handle image URL
//   const imageUrl = req.file ? `/img/${req.file.filename}` : req.body.existing_image;
  
//   try {
//     await Event.updateEvent(
//       id,
//       titre,
//       apercu,
//       description,
//       imageUrl,
//       date_debut,
//       date_fin,
//       time,
//       lieu,
//       observations,
//       participation,
//       info_add
//     );
//     req.flash("success_msg", "Event updated successfully.");
//     res.redirect("/events");
//   } catch (err) {
//     console.error("Error updating event:", err);
//     req.flash("error_msg", "Error updating event.");
//     res.redirect(`/modifyevent/${id}`);
//   }
// };



// Add Sponsor
module.exports.addSponsor = [
    upload.single('image_url'), // Handle single file upload
    body("nom").isLength({ min: 3 }).withMessage("Nom must be at least 3 characters long").trim().escape(),
    body("description").optional().trim().escape(),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Validation errors occurred.");
        return res.redirect(`/event/${req.body.evenement_id}/add_sponsor`);
      }
  
      const { nom, description, evenement_id } = req.body;
      const imageUrl = req.file ? `/img/${req.file.filename}` : null;
  
      try {
        await Sponsor.create({ nom, description, image_url: imageUrl, evenement_id });
        req.flash("success_msg", "Sponsor added successfully.");
        res.redirect(`/event/${evenement_id}/view`);
      } catch (err) {
        console.error("Error adding sponsor:", err);
        req.flash("error_msg", "Error adding sponsor.");
        res.redirect(`/event/${evenement_id}/add_sponsor`);
      }
    }
  ];
  
  // Add Speaker
  module.exports.addSpeaker = [
    upload.single('image_url'), // Handle single file upload
    body("nom").isLength({ min: 3 }).withMessage("Nom must be at least 3 characters long").trim().escape(),
    body("prenom").isLength({ min: 3 }).withMessage("Prénom must be at least 3 characters long").trim().escape(),
    body("description").optional().trim().escape(),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Validation errors occurred.");
        return res.redirect(`/event/${req.body.evenement_id}/add_speaker`);
      }
  
      const { nom, prenom, description, evenement_id } = req.body;
      const imageUrl = req.file ? `/img/${req.file.filename}` : null;
  
      try {
        await Speaker.create({ nom, prenom, description, image_url: imageUrl, evenement_id });
        req.flash("success_msg", "Speaker added successfully.");
        res.redirect(`/event/${evenement_id}/view`);
      } catch (err) {
        console.error("Error adding speaker:", err);
        req.flash("error_msg", "Error adding speaker.");
        res.redirect(`/event/${evenement_id}/add_speaker`);
      }
    }
  ];
  
