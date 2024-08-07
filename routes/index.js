const express = require('express');
const router = express.Router();

const news = [

    { img: 'img/Image1.jpg', speaker: 'Alice Martin', date: '2024-08-05', title: 'Nouvelle Politique Agricole' },
    { img: 'img/Image2.jpg', speaker: 'Bob Dupont', date: '2024-07-30', title: 'Techniques Modernes de Culture' },
    { img: 'img/Image3.jpg', speaker: 'Clara Moreau', date: '2024-07-25', title: 'Innovation dans l’Agroalimentaire' },
];

const events = [
    { img: 'img/Image1.jpg', title: 'Salon de l’Agriculture', date: '2024-09-15', location: 'Paris' },
    { img: 'img/Image2.jpg', title: 'Journée de l’Environnement', date: '2024-10-10', location: 'Lyon' },
    { img: 'img/Image3.jpg', title: 'Forum de l’Innovation', date: '2024-11-20', location: 'Marseille' },
];

const sponsors = [
    { img: 'img/OIP-removebg-preview.png' },
    { img: 'img/OCP_Logo.png' },
    { img: 'img/logo-removebg-preview.png' },
    // Ajoutez plus de sponsors si nécessaire
];

router.get('/', (req, res) => {
    res.render('pages/accueil',{
        events,news,sponsors
    });

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

        title: "Evénments"

    });
});
router.get('/connecter', (req, res) => {
    res.render('auth/login',{

        title: "Connecter"
    });
});

router.get('/detail', (req, res) => {
    res.render('event/details',{

        title: "Detail Evénment"

    });
});
// router.get('/list-event', (req, res) => {
//     res.render('admin/list-event',{

//     });
// });

module.exports = router;



