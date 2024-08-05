const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/accueil');
});
router.get('/propos', (req, res) => {
    res.render('pages/propos',{
        title: "À Propos"
    });
});
router.get('/contact', (req, res) => {
    res.render('pages/contact',{
        title: "Contact"
    });
});
router.get('/actualites', (req, res) => {
    res.render('pages/actualites',{
        title: "Actualités"
    });
});
router.get('/evenements', (req, res) => {
    res.render('pages/evenements',{
        title: "Evénements"
    });
});
router.get('/connecter', (req, res) => {
    res.render('auth/login',{

        title: "Connecter"
    });
});
module.exports = router;
