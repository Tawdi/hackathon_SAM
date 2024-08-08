const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const eventController = require('../controllers/eventController');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
  });
  
  const upload = multer({ storage: storage });
  
  

router.get('/admin',(req, res) => {
    res.render('admin/dashboard');
});
// ,isAdmin()
router.get('/create_event',(req, res) => {
    res.render('admin/create_event');
});
router.post('/create_event',upload.single('image_url'), eventController.addEvent); // Handle form submission for creating an event

// router.post('/create_event',)
module.exports = router;
