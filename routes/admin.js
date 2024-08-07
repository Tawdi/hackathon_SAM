const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth')
const eventController = require('../controllers/eventController');

router.get('/admin',(req, res) => {
    res.render('admin/dashboard');
});
// ,isAdmin()
router.get('/create_event',(req, res) => {
    res.render('admin/create_event');
});
router.post('/create_event', eventController.createEvent); // Handle form submission for creating an event

// router.post('/create_event',)
module.exports = router;
