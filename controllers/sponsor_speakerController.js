const upload = require('../config/multerConfig'); // assuming you have a multer config set up
const { body, validationResult } = require('express-validator');
const Sponsor = require('../models/sponsorModel');
const Speaker = require('../models/speakerModel');

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
