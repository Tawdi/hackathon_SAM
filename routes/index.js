const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/accueil');
});
router.get('/propos', (req, res) => {
    res.render('pages/propos');
});
router.get('/contact', (req, res) => {
    res.render('pages/contact');
});
router.get('/actualites', (req, res) => {
    res.render('pages/actualites');
});
router.get('/evenements', (req, res) => {
    res.render('pages/evenements');
});
router.get('/connecter', (req, res) => {
    res.render('auth/login');
});
module.exports = router;
