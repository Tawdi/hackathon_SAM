
// routes/event.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/evenements', eventController.showEventsUserPage);
router.get('/detail_:id', eventController.getEventById);

module.exports = router;