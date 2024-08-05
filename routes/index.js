const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/accueil');
});
router.get('/propos', (req, res) => {
    res.render('pages/propos',{
        title: "propos"
    });
});
router.get('/contact', (req, res) => {
    res.render('pages/contact',{
        title: "contact"
    });
});
router.get('/actualites', (req, res) => {
    res.render('pages/actualites',{
        title: "actualites"
    });
});
router.get('/evenements', (req, res) => {
    res.render('pages/evenements',{
        title: "evenements"
    });
});
router.get('/connecter', (req, res) => {
    res.render('auth/login',{
        title: "connecter" 
    });
});
module.exports = router;
