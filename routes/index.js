const express = require('express');
const router = express.Router();
const events = [
    {
        imgSrc: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
        title: "National Farm Machinery Show 2024",
        date: "Février 2024",
        location: "Louisville, Kentucky, USA",
        apercu: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
    },
    {
        imgSrc: "https://via.placeholder.com/800x600?text=ICSAM+2024",
        title: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
        date: "Juin 2024",
        location: "Lyon, France",
        apercu: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
    },
    {
        imgSrc: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
        title: "Agritechnica 2023",
        date: "Novembre 2023",
        location: "Hanovre, Allemagne",
        apercu: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
    },
    {
        imgSrc: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
        title: "Farm Progress Show 2023",
        date: "Septembre 2023",
        location: "Boone, Iowa, USA",
        apercu: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
    },
    {
        imgSrc: "https://via.placeholder.com/800x600?text=SIMA+2023",
        title: "SIMA 2023",
        date: "Octobre 2023",
        location: "Paris, France",
        apercu: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
    }
  ];
  
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
 router.get('/list-event', (req, res) => {
   res.render('admin/list-event',{
    events

});
 });

module.exports = router;
