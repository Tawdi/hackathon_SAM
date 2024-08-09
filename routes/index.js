const express = require('express');
const router = express.Router();


const news = [

    { image_url : 'img/Image1.jpg', nom : 'Alice Martin', date: '2024-08-05', title: 'Nouvelle Politique Agricole' },
    { image_url : 'img/Image2.jpg', nom : 'Bob Dupont', date: '2024-07-30', title: 'Techniques Modernes de Culture' },
    { image_url : 'img/Image3.jpg', nom : 'Clara Moreau', date: '2024-07-25', title: 'Innovation dans l’Agroalimentaire' },
];

const eventss = [
    { image_url: 'img/ac.jpg', titre: 'Lancement du Nouveau Système SAM', description: "Le nouveau Système d'Administration et de Management a été lancé à Casablanca. Cet événement marque une étape importante pour améliorer la gestion administrative dans les entreprises marocaines" },
    { image_url: 'img/ac 2.jpg', titre: 'Conférence SAM à Rabat', description: 'La conférence SAM 2024 se tiendra à Rabat. Des experts partageront des insights sur l\'optimisation des systèmes d\'administration pour les entreprises marocaines' },
    { image_url: 'img/ac3.jpg', titre: 'Atelier SAM à Marrakech', description: 'Un atelier de formation sur les systèmes SAM est prévu à Marrakech. Les participants apprendront comment intégrer efficacement ces systèmes pour améliorer la gestion des affaires' },
];

const sponsors = [
    { img: 'img/OIP-removebg-preview.png' },
    { img: 'img/OCP_Logo.png' },
    { img: 'img/logo-removebg-preview.png' },
    // Ajoutez plus de sponsors si nécessaire
];


const events_past = [

  {
    image_url: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      titre: "National Farm Machinery Show 2024",
      date_debut: "Février 2024",
      lieu: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      titre: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date_debut: "Juin 2024",
      lieu: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      titre: "Agritechnica 2023",
      date_debut: "Novembre 2023",
      lieu: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      titre: "Farm Progress Show 2023",
      date_debut: "Septembre 2023",
      lieu: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=SIMA+2023",
      titre: "SIMA 2023",
      date_debut: "Octobre 2023",
      lieu: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];


const events_present = [
  {
    image_url: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      titre: "National Farm Machinery Show 2024",
      date_debut: "Février 2024",
      lieu: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
      image_url: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      titre: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date_debut: "Juin 2024",
      lieu: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      titre: "Agritechnica 2023",
      date_debut: "Novembre 2023",
      lieu: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      titre: "Farm Progress Show 2023",
      date_debut: "Septembre 2023",
      lieu: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=SIMA+2023",
      titre: "SIMA 2023",
      date_debut: "Octobre 2023",
      lieu: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];

const events_future = [
  {
    image_url: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
      titre: "National Farm Machinery Show 2024",
      date_debut: "Février 2024",
      lieu: "Louisville, Kentucky, USA",
      description: "Salon des équipements agricoles aux USA, mettant en avant les innovations en mécanisation durable."
  },
  {
      image_url: "https://via.placeholder.com/800x600?text=ICSAM+2024",
      titre: "International Conference on Sustainable Agriculture and Mechanization (ICSAM) 2024",
      date_debut: "Juin 2024",
      lieu: "Lyon, France",
      description: "Conférence internationale sur les innovations en agriculture durable et mécanisation. Réunit chercheurs, ingénieurs, et professionnels."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Agritechnica+2023",
      titre: "Agritechnica 2023",
      date_debut: "Novembre 2023",
      lieu: "Hanovre, Allemagne",
      description: "Le plus grand salon mondial des machines agricoles, présentant les dernières innovations en matière de technologie agricole."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=Farm+Progress+Show+2023",
      titre: "Farm Progress Show 2023",
      date_debut: "Septembre 2023",
      lieu: "Boone, Iowa, USA",
      description: "Salon annuel des progrès agricoles, mettant en avant les nouvelles technologies et pratiques agricoles."
  },
  {
    image_url: "https://via.placeholder.com/800x600?text=SIMA+2023",
      titre: "SIMA 2023",
      date_debut: "Octobre 2023",
      lieu: "Paris, France",
      description: "Salon international des fournisseurs de l’agriculture et de l’élevage, présentant des innovations en matière de mécanisation agricole."
  }
];

const events = [
    {
        imgSrc: "https://via.placeholder.com/800x600?text=National+Farm+Machinery+Show+2024",
        title: "National Farm Machinery Show 2024",
        date_debut: "Février 2024",
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

  const event = {
    image_url: 'img/ac.jpg', titre: 'Lancement du Nouveau Système SAM', description: "Le nouveau Système d'Administration et de Management a été lancé à Casablanca. Cet événement marque une étape importante pour améliorer la gestion administrative dans les entreprises marocaines"
};

const newss = [
    {
        image_url: "img/Image1.jpg",
        nom: "Technologie ",
        prenom : "Avancée",
        description: "Dernières tendances en IA"
    },
    {
        image_url: "img/Image1.jpg",
        nom: "Energies Renouvelables",
        prenom : "Renouvelable",
        description: "Solutions écologiques"
    },
    {
        image_url: "img/Image1.jpg",
        nom: "Santé et Bien-être",
        prenom : "Avancée",
        description: "Innovation en soins de santé"
    },
    {
        image_url: "img/Image1.jpg",
        nom: "Technologies ",
        prenom : " Communication",
        description: "Réseaux de nouvelle génération"
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

router.get('/connecter', (req, res) => {
    res.render('auth/login',{

        title: "Connecter"
    });
});

router.get('/detail', (req, res) => {
    res.render('event/details',{

        title: "Detail Evénment",
        event,
        newss

    });
});
//  router.get('/list-event', (req, res) => {
//    res.render('admin/list-event',{
//     events

// });
//  });
 const programController = require('../controllers/programController');

//  router.get('/candidatures', isAuthenticated, isAdmin, CandidatureController.getCandidatures);
//  router.post('/candidature/:id/accept', isAuthenticated, isAdmin, CandidatureController.acceptCandidature);
//  router.post('/candidature/:id/refuse', isAuthenticated, isAdmin, CandidatureController.refuseCandidature);
//  router.post('/candidature/:evenement_id', isAuthenticated, CandidatureController.addCandidature);
 
 
 router.post('/add-program', programController.addProgram);
 router.get('/programs/:eventId', programController.getProgramsByEventId);
module.exports = router;



