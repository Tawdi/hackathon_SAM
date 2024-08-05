// const express = require('express');
// const router = express.Router();
// const pool = require('../config/database');

// router.get('/', async (req, res) => {
//     try {
//         const [rows, fields] = await pool.query('SELECT * FROM events');
//         res.render('event', { events: rows });
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la récupération des événements.');
//     }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Event = require('../models/event');

// // Lister tous les événements
// router.get('/', async (req, res) => {
//     try {
//         const events = await Event.getAll();
//         res.render('event/index', { events });
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la récupération des événements.');
//     }
// });

// // Formulaire pour créer un nouvel événement
// router.get('/new', (req, res) => {
//     res.render('event/new');
// });

// // Créer un nouvel événement
// router.post('/new', async (req, res) => {
//     const { name, description, location, start_date, end_date } = req.body;
//     try {
//         await Event.create({ name, description, location, start_date, end_date });
//         res.redirect('/events');
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la création de l\'événement.');
//     }
// });

// // Formulaire pour éditer un événement
// router.get('/edit/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const event = await Event.getById(id);
//         res.render('event/edit', { event });
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la récupération de l\'événement.');
//     }
// });

// // Mettre à jour un événement
// router.post('/edit/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, description, location, start_date, end_date } = req.body;
//     try {
//         await Event.update({ id, name, description, location, start_date, end_date });
//         res.redirect('/events');
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la mise à jour de l\'événement.');
//     }
// });

// // Supprimer un événement
// router.post('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Event.delete(id);
//         res.redirect('/events');
//     } catch (err) {
//         console.error(err);
//         res.send('Erreur lors de la suppression de l\'événement.');
//     }
// });

// module.exports = router;
// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET all events
router.get('/', eventController.getAllEvents);

// GET a single event by ID
router.get('/:id', eventController.getEventById);

// POST create a new event
router.post('/', eventController.createEvent);

// PUT update an existing event
router.put('/:id', eventController.updateEvent);

// DELETE an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
