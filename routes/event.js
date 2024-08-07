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
// const express = require('express');
// const router = express.Router();
// const eventController = require('../controllers/eventController');

// // GET all events
// router.get('/', eventController.getAllEvents);

// // GET a single event by ID
// router.get('/:id', eventController.getEventById);
// // router.get('/create', eventController.showCreateEvent);
// // router.get('/create', (req, res) => {
// //     res.render('admin/',{

// //         title: "À Propos"

// //     });
// // });

// // POST create a new event
// // router.post('/', eventController.createEvent);

// // PUT update an existing event
// router.put('/:id', eventController.updateEvent);

// // DELETE an event
// router.delete('/:id', eventController.deleteEvent);

// module.exports = router;



// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const middleware = require('../middlewares/auth')

router.get('/', eventController.getAllEvents);

// Route to get a specific event by ID
router.get('/:id', eventController.getEventById);

// Route to create a new event
// router.get('/create', (req, res) => {
//     res.render('event/new'); // Render the form for creating a new event
// });

// Route to update an event
router.get('/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const event = await eventController.getEventById(req, res);
        if (event) {
            res.render('event/edit', { event }); // Render the form for editing the event
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
router.put('/:id', eventController.updateEvent); // Handle form submission for updating an event

// Route to delete an event
router.delete('/:id', eventController.deleteEvent); // Handle form submission for deleting an event

module.exports = router;