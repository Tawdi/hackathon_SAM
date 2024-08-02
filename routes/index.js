const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/accueil');
});
router.get('/evenements', (req, res) => {
    res.render('pages/accueil');
});
router.get('/evenements', (req, res) => {
    res.render('pages/accueil');
});
module.exports = router;
