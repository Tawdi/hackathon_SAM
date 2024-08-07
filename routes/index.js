const express = require('express');
const router = express.Router();


const news = [

    { img: 'img/Image1.jpg', speaker: 'Alice Martin', date: '2024-08-05', title: 'Nouvelle Politique Agricole' },
    { img: 'img/Image2.jpg', speaker: 'Bob Dupont', date: '2024-07-30', title: 'Techniques Modernes de Culture' },
    { img: 'img/Image3.jpg', speaker: 'Clara Moreau', date: '2024-07-25', title: 'Innovation dans l’Agroalimentaire' },
];

const eventss = [
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


const events_past = [
  {
      imgSrc: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      title: "National Farm Machinery Show 2024",
      date: "Février 2024",
      location: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      title: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date: "Juin 2024",
      location: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      title: "Agritechnica 2023",
      date: "Novembre 2023",
      location: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      title: "Farm Progress Show 2023",
      date: "Septembre 2023",
      location: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=SIMA+2023",
      title: "SIMA 2023",
      date: "Octobre 2023",
      location: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];


const events_present = [
  {
      imgSrc: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      title: "National Farm Machinery Show 2024",
      date: "Février 2024",
      location: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      title: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date: "Juin 2024",
      location: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      title: "Agritechnica 2023",
      date: "Novembre 2023",
      location: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      title: "Farm Progress Show 2023",
      date: "Septembre 2023",
      location: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=SIMA+2023",
      title: "SIMA 2023",
      date: "Octobre 2023",
      location: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];

const events_future = [
  {
      imgSrc: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      title: "National Farm Machinery Show 2024",
      date: "Février 2024",
      location: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      title: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date: "Juin 2024",
      location: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      title: "Agritechnica 2023",
      date: "Novembre 2023",
      location: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      title: "Farm Progress Show 2023",
      date: "Septembre 2023",
      location: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
      imgSrc: "https://via.placeholder.com/800x600?text=SIMA+2023",
      title: "SIMA 2023",
      date: "Octobre 2023",
      location: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];

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
    res.render('pages/accueil',{
        eventss,news,sponsors
    });

});
router.get('/propos', (req, res) => {
    res.render('pages/propos',{

        title: "À Propos"

    });
});
router.get('/contact', (req, res) => {
    res.render('pages/contact',{
        title: "Contact",
        events,
    });
});
router.get('/actualites', (req, res) => {
    res.render('pages/actualites',{
        title: "Actualités"
    });
});
router.get('/evenements', (req, res) => {
    res.render('pages/evenements',{

        title: "Evénments",
        events_future,
        events_past,
        events_present

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
 const programController = require('../controllers/programController');

 router.post('/add-program', programController.addProgram);
 router.get('/programs/:eventId', programController.getProgramsByEventId);
module.exports = router;



